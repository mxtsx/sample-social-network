import h from "./Header.module.css";
import {NavLink, useLocation} from "react-router-dom";
import logo from "../../logo.svg"
import React from "react";
import {Button} from "antd";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    login: string | null,
    auth: boolean | null
}

type MapDispatchToPropsType = {
    userLogout: () => void
}

const Header: React.FC<PropsType> = React.memo(({login, auth, userLogout}) => {
    const currentPagePath = useLocation().pathname
    return(
        <header className={h.headerContainer}>
            <div className={h.siteInfo}>
                <img className={h.logo} src={logo} alt=""/>
                <div className={h.networkName}>
                    <span>
                        Sample Social Network
                    </span>
                </div>
            </div>
            {currentPagePath !== "/login" &&
            <div className={h.loginInfo}>
                <div className={h.loginContainer}>
                    {auth
                        ?   <div>
                                <span className={h.login}>
                                    {login}
                                </span>
                                <Button type="default" onClick={userLogout}>
                                    Logout
                                </Button>
                            </div>
                        :
                        <NavLink to={"/login"} activeClassName={h.active}>
                                <Button type={"default"}>
                                     Login
                                </Button>
                            </NavLink>
                    }
                </div>
            </div>}
        </header>
    )
})

export default Header