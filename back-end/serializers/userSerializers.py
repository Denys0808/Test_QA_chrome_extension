def userEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "verified": user["verified"],
        "password": user["password"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"],
    }


def userResponseEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "verified": user["verified"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"],
    }


def userListEntity(users) -> list:
    return [userResponseEntity(user) for user in users]

def userProfileEntity(profile) -> dict:
    return {
        "id": str(profile["_id"]),
        "school": profile["school"],
        "grade": profile["grade"],
        "instgram": profile["instgram"],
        "userid": profile["userid"]
    }