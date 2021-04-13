import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

const USER_AUTHENTICATION = 'auth/USER_AUTHENTICATION'
const LOGOUT = 'auth/LOGOUT'
const GET_CAPTCHA = 'auth/GET_CAPTCHA'

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    auth: false,
    captchaURL: null as null | string
}

const authReducer = (state = initialState, action: ActionTypes): AuthReducerInitialStateType => {
    switch(action.type) {
        case USER_AUTHENTICATION:
            return {
                ...state,
                ...action.data
            }
        case LOGOUT:
            return {
                ...state,
                auth: false
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        default:
            return state
    }
}

export const actions = {
    userAuth: (id: number, email: string, login: string, auth = false) => ({type: USER_AUTHENTICATION, data: {id, email, login, auth}} as const),
    logout: () => ({type: LOGOUT} as const),
    getCaptcha: (captchaURL: string) => ({type: GET_CAPTCHA, captchaURL} as const),
}

export const userAuthentication = (): AuthReducerThunkTypes => {
    return async (dispatch) => {
        const response = await authAPI.getAuth()
        if(response.data.resultCode === 0) {
            const {email, id, login} = response.data.data
            dispatch(actions.userAuth(id, email, login, true))
        }
    }
}

export const userLogin = (email: string, password: string, rememberMe: boolean, captcha: string): AuthReducerThunkTypes => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if(response.data.resultCode === 0) {
            dispatch(userAuthentication())
        } else if(response.data.resultCode === 10) {
            dispatch(setCaptchaUrl())
        } else {
            const message = response.data.messages[0] ? response.data.messages[0] : "Something goes wrong :("
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const userLogout = (): AuthReducerThunkTypes => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(actions.logout())
        }
    }
}

export const setCaptchaUrl = (): AuthReducerThunkTypes => {
    return async (dispatch) => {
        const response = await authAPI.captcha()
        const captcha = response.data.url
        dispatch(actions.getCaptcha(captcha))
    }
}

type AuthReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type AuthReducerThunkTypes = BaseThunkType<ActionTypes>

export default authReducer