import s from "./Sidebar.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const Sidebar: React.FC = React.memo((props) => {
    return(
        <aside className={s.sidebar}>
            <nav className={s.contentWrapper}>
            <div className={s.link}>
                <NavLink to={"/profile"} activeClassName={s.active}>
                    Profile
                </NavLink>
            </div>
            <div className={s.link}>
                <NavLink to={"/users"} activeClassName={s.active}>
                    Users
                </NavLink>
            </div>
            <div className={s.link}>
                <NavLink to={"/chat"} activeClassName={s.active}>
                    Chat
                </NavLink>
            </div>
            </nav>
        </aside>
    )
})

export default Sidebar