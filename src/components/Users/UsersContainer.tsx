import React from "react";
import Users from "./Users";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import {compose} from "redux";
import withError from "../../hoc/withError";

const UsersContainer: React.FC = React.memo((props) => {
        return (
            <Users/>
        )
    }
)
export default compose<React.ComponentType>(withError, withLoginRedirect)(UsersContainer)