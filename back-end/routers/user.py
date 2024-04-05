from fastapi import APIRouter, Depends, status, HTTPException
from bson.objectid import ObjectId
from serializers.userSerializers import userResponseEntity, userProfileEntity

from database import User, Profile
from schemas import userSchemas
import oauth2

router = APIRouter()


@router.get("/me", response_model=userSchemas.UserResponse)
def get_me(user_id: str = Depends(oauth2.require_user)):
    user = userResponseEntity(User.find_one({"_id": ObjectId(str(user_id))}))
    return {"status": "success", "user": user}

@router.get("/profile", response_model=userSchemas.UserProfileResponse)
def get_profile(user_id: str = Depends(oauth2.require_user)):
    profileEntity = Profile.find_one({"userid": str(user_id)})
    if not profileEntity:
        return {"status": "not found", "profile": {
            "id": "",
            "school": "",
            "grade": "",
            "instgram": "",
            "userid": "",
        }}
    profile = userProfileEntity(profileEntity)
    return {"status": "success", "profile": profile}

@router.post(
    "/profile",
    status_code=status.HTTP_201_CREATED,
    response_model=userSchemas.UserProfileResponse,
)
async def create_profile(payload: userSchemas.CreateProfileSchema):
    user = Profile.find_one({"userid": payload.userid})
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Profile already exist"
        )

    result = Profile.insert_one(payload.dict())
    new_profile = userProfileEntity(Profile.find_one({"_id": result.inserted_id}))
    return {"status": "success", "profile": new_profile}