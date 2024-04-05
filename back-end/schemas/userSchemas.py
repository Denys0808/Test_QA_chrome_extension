from datetime import datetime
from pydantic import BaseModel, EmailStr, constr


class UserBaseSchema(BaseModel):
    name: str
    email: str
    role: str | None = None
    verified: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        orm_mode = True


class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8)
    passwordConfirm: str
    verified: bool = False

class CreateProfileSchema(BaseModel):
    school: str
    grade: str
    instgram: str
    userid: str


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class UserResponseSchema(UserBaseSchema):
    id: str
    pass

class UserProfileSchema(CreateProfileSchema):
    id: str
    pass

class UserResponse(BaseModel):
    status: str
    user: UserResponseSchema

class UserProfileResponse(BaseModel):
    status: str
    profile: UserProfileSchema