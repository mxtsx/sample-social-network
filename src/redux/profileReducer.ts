import {profileAPI} from "../api/profileApi";
import {ProfilePhotosType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersApi";

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const GET_USER_STATUS = 'profile/GET_USER_STATUS'
const SET_IS_FETCHING = 'profile/SET_IS_FETCHING'
const SET_NEW_PHOTO = 'profile/SET_NEW_PHOTO'
const IS_USER_FOLLOWED = 'profile/IS_USER_FOLLOWED'

const initialState = {
    profile: null as ProfileType | null,
    status: '',
    isFetching: false,
    isFollowed: null as boolean | null
}

const profileReducer = (state = initialState, action: ActionTypes): ProfileReducerInitialStateType => {
    switch(action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case GET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_NEW_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case IS_USER_FOLLOWED:
            return {
                ...state,
                isFollowed: action.payload.isFollowed
            }
        default:
            return state
    }
}

export const actions = {
    getNewProfile: (profile: ProfileType | null) => ({type: SET_USER_PROFILE, profile} as const),
    getUserStatus: (status: string) => ({type: GET_USER_STATUS, status} as const),
    setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching} as const),
    setNewPhoto: (photos: ProfilePhotosType) => ({type: SET_NEW_PHOTO, photos} as const),
    userIsFollowed: (isFollowed: boolean | null) => ({type: IS_USER_FOLLOWED, payload: {isFollowed}} as const)
}

export const setUserProfile = (id: number | null): ProfileReducerThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        const response = await profileAPI.getProfile(id)
        dispatch(actions.getNewProfile(response.data))
        dispatch(actions.setIsFetching(false))
    }
}

export const getCurrentUserStatus = (id: number): ProfileReducerThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        const response = await profileAPI.getUserStatus(id)
        dispatch(actions.getUserStatus(response.data))
        dispatch(actions.setIsFetching(false))
    }
}

export const setUserStatus = (status: string): ProfileReducerThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        const response = await profileAPI.updateUserStatus(status)
        if(response.data.resultCode === 0) {
            dispatch(actions.getUserStatus(status))
            dispatch(actions.setIsFetching(false))
        }
    }
}

export const setUserProfileUpdate = (profile: ProfileType): ProfileReducerThunkType => {
    return async (dispatch, getState) => {
        const id = getState().auth.id
        const response = await profileAPI.updateProfileInformation(profile)
        if(response.data.resultCode === 0) {
            await dispatch(setUserProfile(id))
        }
    }
}

export const setNewProfilePhotos = (photos: File): ProfileReducerThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.updateProfilePhoto(photos)
        if(response.data.resultCode === 0) {
            dispatch(actions.setNewPhoto(response.data.data.photos))
        }
    }
}

export const isUserFollowed = (id: number): ProfileReducerThunkType => {
    return async (dispatch) => {
        const response = await usersAPI.isFollow(id)
        dispatch(actions.userIsFollowed(response))
    }
}

type ProfileReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ProfileReducerThunkType = BaseThunkType<ActionTypes>

export default profileReducer