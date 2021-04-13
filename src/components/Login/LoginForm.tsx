import {InjectedFormProps, reduxForm} from 'redux-form'
import lf from "./LoginForm.module.css"
import lfc from "../common/FormControls/FormControls.module.css"
import {CreateField, Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators";
import l from "./Login.module.css";
import React from "react";
import {LoginFormDataType} from "./Loginn";
import {Button} from "antd";

type PropsType = {
    captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, PropsType> & PropsType> = React.memo(({handleSubmit, error, captchaURL}) => {
    return(
        <form onSubmit={handleSubmit} className={lf.loginFormContainer}>
            <div className={l.loginTitle}>Login</div>
            <div>
                {CreateField("Email", "email", Input, undefined, undefined, [requiredField])}
                {CreateField("Password", "password", Input, "password", undefined, [requiredField])}
                {CreateField(undefined, "rememberMe", "input", "checkbox", "Remember me")}
            </div>
            { captchaURL &&
            <img src={captchaURL} alt=""/>
            }
            { captchaURL &&
                CreateField("Your captcha", "captcha", Input, undefined, undefined, [requiredField])
            }
            { error &&
            <div className={lfc.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <Button type={"default"} htmlType={"submit"}>
                    Submit
                </Button>
            </div>
        </form>
    )
})

const LoginReduxForm = reduxForm<LoginFormDataType, PropsType>({form: "login"})(LoginForm)

export default LoginReduxForm