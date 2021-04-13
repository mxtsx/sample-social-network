import {AppStateType} from "./reduxStore";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingIsFetching = (state: AppStateType) => {
    return state.usersPage.followingIsFetching
}

export const getCurrentFilter = (state: AppStateType) => {
    return state.usersPage.filter
}