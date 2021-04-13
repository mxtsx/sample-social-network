import {instance, ServerResponseType} from "./api";
import {UserType} from "../types/types";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

export const usersAPI = {
    getUsers(count: number, page: number, term = '', friend: boolean | null = null) {
        return instance.get<UsersResponseType>(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`)
    },
    follow(id: number) {
        return instance.post<ServerResponseType>(`follow/${id}`, {})
    },
    unfollow(id: number) {
        return instance.delete<ServerResponseType>(`follow/${id}`)
    },
    isFollow(id:number) {
        return instance.get<boolean>(`follow/${id}`).then(res => res.data)
    }
}