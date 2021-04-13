import {usersAPI} from "../api/usersApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {ServerResponseType} from "../api/api";
import {AxiosResponse} from "axios";

const GET_USERS = 'users/GET_USERS'
const GET_TOTAL_USERS_COUNT = 'users/GET_TOTAL_USERS_COUNT'
const FOLLOW_UNFOLLOW_USER = 'users/FOLLOW_UNFOLLOW_USER'
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE'
const SET_FILTER = 'user/SET_FILTER'
const FOLLOWING_IS_FETCHING = 'user/FOLLOWING_IS_FETCHING'
const SET_FETCHING = 'user/SET_FETCHING'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingIsFetching: [] as Array<number>,
    filter: {
        term: '',
        friend: null as boolean | null
    }
}

const usersReducer = (state = initialState, action: ActionTypes):UsersReducerInitialStateType => {
    switch(action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case GET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsers
            }
        case GET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case FOLLOW_UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.id) {
                        return {...u, followed: action.followed}
                    }
                    return u
                })
            }
        case FOLLOWING_IS_FETCHING:
            return {
                ...state,
                followingIsFetching: action.isFetching ? [...state.followingIsFetching, action.id]
                : state.followingIsFetching.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export const actions = {
    setCurrentPage: (currentPage = 1) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    getNewUsers: (users: Array<UserType>) => ({type: GET_USERS, users} as const),
    setFetching: (isFetching: boolean) => ({type: SET_FETCHING, isFetching} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),
    followingDataIsFetching: (isFetching: boolean, id: number) => ({type: FOLLOWING_IS_FETCHING, isFetching, id} as const),
    getTotalUsersCount: (totalUsers: number) => ({type: GET_TOTAL_USERS_COUNT, totalUsers} as const),
    followUnfollowUserSuccess: (followed: boolean, id: number) => ({type: FOLLOW_UNFOLLOW_USER, followed, id} as const),
}


export const getUsers = (pageSize: number, page: number, filter: FilterType): UsersReducerThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        dispatch(actions.setFilter(filter))
        dispatch(actions.setCurrentPage(page))
        const response = await usersAPI.getUsers(pageSize, page, filter.term, filter.friend)
        const {items, totalCount} = (response.data)
        dispatch(actions.getNewUsers(items))
        dispatch(actions.getTotalUsersCount(totalCount))
        dispatch(actions.setFetching(false))
    }
}

export const followUnfollowUser = async (followValue: boolean, id: number, apiMethod: (id: number) => Promise<AxiosResponse<ServerResponseType>>, actionCreator: (followed: boolean, id: number) => ActionTypes, dispatch: Dispatch) => {
        dispatch(actions.followingDataIsFetching(true, id))
        const response = await apiMethod(id)
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(followValue, id))
        }
        dispatch(actions.followingDataIsFetching(false, id))
}

export const followUser = (id: number): UsersReducerThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI)
        const followValue = true
        const actionCreator = actions.followUnfollowUserSuccess
        await followUnfollowUser(followValue, id, apiMethod, actionCreator, dispatch)
    }
}

export const unfollowUser = (id: number): UsersReducerThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.unfollow.bind(usersAPI)
        const followValue = false
        const actionCreator = actions.followUnfollowUserSuccess
        await followUnfollowUser(followValue, id, apiMethod, actionCreator, dispatch)
    }
}

type UsersReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type UsersReducerThunkType = BaseThunkType<ActionTypes>
export type FilterType = typeof initialState.filter

export default usersReducer