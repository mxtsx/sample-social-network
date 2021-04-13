import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import l from "./Login.module.css"
import React from "react";

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    auth: boolean,
    captchaURL: string | null
}
type MapDispatchToPropsType = {
    userLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    setCaptchaUrl: () => void
}
export type LoginFormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

const Login: React.FC<PropsType> = React.memo(({auth, userLogin, captchaURL}) => {
    const onSubmit = (formData: LoginFormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        userLogin(email, password, rememberMe, captcha)
    }
    if(auth){
        return <Redirect to={'/profile'}/>
    }
    return(
        <div className={l.loginContainer}>
            <div className={l.loginWrapper}>
            <LoginForm captchaURL={captchaURL} onSubmit={onSubmit} />
            </div>
        </div>
    )
})

export default Login