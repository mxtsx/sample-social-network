import {AppStateType} from "./reduxStore";

export const getId = (state: AppStateType) => {
    return state.auth.id
}

export const getEmail = (state: AppStateType) => {
    return state.auth.email
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getAuth = (state: AppStateType) => {
    return state.auth.auth
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaURL
}