import axios from "axios";
export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "86dfe136-7be0-4b1e-b813-164c7f450a17"
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