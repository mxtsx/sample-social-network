import {AppStateType} from "./reduxStore";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getProfileIsFetching = (state: AppStateType) => {
    return state.profilePage.isFetching
}

export const getIsFollowed = (state: AppStateType) => {
    return state.profilePage.isFollowed
}