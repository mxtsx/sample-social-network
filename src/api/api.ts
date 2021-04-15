import axios from "axios";
const { API_KEY } = process.env

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": API_KEY
    }
})

export enum ServerResponseCode {
    Success = 0,
    Error = 1
}

export enum ServerResponseCaptcha {
    Captcha = 10
}

export type ServerResponseType<D = {}, RC = ServerResponseCode | ServerResponseCaptcha> = {
    data: D
    resultCode: RC
    messages: Array<string>
}