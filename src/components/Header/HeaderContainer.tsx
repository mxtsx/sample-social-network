import React, {Component} from "react";
import {connect} from "react-redux";
import {userLogout, userAuthentication} from "../../redux/authReducer";
import Header from "./Header";
import {AppStateType} from "../../redux/reduxStore";
import {getAuth, getEmail, getLogin} from "../../redux/authSelectors";

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

type MapStateToPropsType = {
    login: string | null,
    auth: boolean | null
}

type MapDispatchToPropsType = {
    userAuthentication: () => void
    userLogout: () => void
}

type OwnPropsType = {}

class HeaderContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.userAuthentication()
    }
    render() {
        return <Header login={this.props.login} auth={this.props.auth}
        userLogout={this.props.userLogout}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: getLogin(state),
        auth: getAuth(state)
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {userAuthentication, userLogout})(HeaderContainer)