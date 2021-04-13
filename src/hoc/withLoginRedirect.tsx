import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as React from "react";
import {AppStateType} from "../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    auth: boolean
}

type MapDispatchToPropsType = {
}

const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.auth.auth
    }
}

function withLoginRedirect<WCP> (Component: React.ComponentType<WCP>) {
    function RedirectedComponent(props: PropsType) {
        const {auth, ...restProps} = props
        if (auth) return <Component {...restProps as WCP}/>
        return <Redirect to={'/login'}/>
    }

    return connect<MapStateToPropsType, MapDispatchToPropsType, WCP, AppStateType>(mapStateToProps)(RedirectedComponent)
}

export default withLoginRedirect