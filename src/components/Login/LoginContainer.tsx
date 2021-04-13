import React from "react";
import Login from "./Loginn";
import {connect} from "react-redux";
import {setCaptchaUrl, userLogin} from "../../redux/authReducer";
import {getAuth, getCaptchaUrl} from "../../redux/authSelectors";
import {AppStateType} from "../../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
type MapStateToPropsType = {
    auth: boolean,
    captchaURL: string | null
}
type MapDispatchToPropsType = {
    userLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    setCaptchaUrl: () => void
}
type OwnPropsType = {}

class LoginContainer extends React.Component<PropsType>{
    render() {
        return(
            <Login {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: getAuth(state),
        captchaURL: getCaptchaUrl(state)
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {userLogin, setCaptchaUrl})(LoginContainer)