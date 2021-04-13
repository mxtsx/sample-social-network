import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "340904a1-1685-4669-8949-4f4936211077"
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