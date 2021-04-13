import {ProfilePhotosType, ProfileType} from "../types/types";
import {instance, ServerResponseType} from "./api";

type UpdatePhotoDataType = {
    photos: ProfilePhotosType
}

export const profileAPI = {
    getProfile(id: number | null) {
        return instance.get<ProfileType>(`profile/${id}`)
    },
    getUserStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`)
    },
    updateUserStatus(status: string) {
        return instance.put<ServerResponseType>(`profile/status`, {status: status})
    },
    updateProfileInformation(profile: ProfileType) {
        return instance.put<ServerResponseType>('profile', profile)
    },
    updateProfilePhoto(photo: File) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put<ServerResponseType<UpdatePhotoDataType>>('profile/photo', formData, {headers: {"Content-Type": "multipart/form-data"}})
    }
}