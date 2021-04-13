import u from "./User.module.css"
import iconMan from "../../../avatarMan.svg"
import iconWoman from "../../../avatarWoman.svg"
import {NavLink} from "react-router-dom";
import * as React from "react";
import {UserType} from "../../../types/types";
import {followUser, unfollowUser} from "../../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingIsFetching} from "../../../redux/usersSelectors";
import {Button} from "antd";
import {userPossiblyIsWoman} from "../../../utils/genderValidator";

type PropsType = MapStateToPropsType
type MapStateToPropsType = {
    user: UserType,
}

const User: React.FC<PropsType> = React.memo(({user}) => {
    const followingIsFetching = useSelector(getFollowingIsFetching)
    const dispatch = useDispatch()
    const follow = (userId: number) => {
        dispatch(followUser(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    }
    return(
        <div className={u.container}>
            <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.large || (userPossiblyIsWoman(user.name) ? iconWoman : iconMan)} alt="" className={u.profilePhoto}/>
            </NavLink>
            <div>
                {user.name}
            </div>
            <div>
                {user.status}
            </div>
            {user.followed &&
            <Button size={"small"} type={"default"} disabled={followingIsFetching.some(id => id === user.id)} onClick={() => unfollow(user.id)}>
                Unfollow
            </Button>
            }
            {!user.followed &&
                <Button size={"small"} type={"default"} disabled={followingIsFetching.some(id => id === user.id)} onClick={() => follow(user.id)}>
                    Follow
                </Button>
            }
        </div>
    )
})

export default User