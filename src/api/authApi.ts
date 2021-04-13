import {instance, ServerResponseType} from "./api";

type AuthDataType = {
    id: number
    email: string
    login: string
}

type LoginDataType = {
    userId: number
}

type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    getAuth() {
        return instance.get<ServerResponseType<AuthDataType>>('auth/me')
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ServerResponseType<LoginDataType>>('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<ServerResponseType>('auth/login')
    },
    captcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
    }
}