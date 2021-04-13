import ProfileInfo from "./ProfileInfo/ProfileInfo";
import * as React from "react";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "../../types/types";
import p from "./Profile.module.css"

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    isOwner: boolean,
    isFetching: boolean,
    status: string,
    profile: ProfileType
}
type MapDispatchToPropsType = {
    setUserStatus: (status: string) => void,
    setUserProfileUpdate: (profile: ProfileType) => void,
    setNewProfilePhotos: (photos: File) => void
}

const Profile: React.FC<PropsType> = React.memo(({status, profile, isFetching, setUserStatus, isOwner, setUserProfileUpdate, setNewProfilePhotos}) => {
    if(profile !== profile) {
        return <Preloader />
    }
    return(
        <div className={p.profileContainer}>
            <ProfileInfo profile={profile} userStatus={status} setUserStatus={setUserStatus}
                         isFetching={isFetching} isOwner={isOwner} setUserProfileUpdate={setUserProfileUpdate}
                         setNewProfilePhotos={setNewProfilePhotos}/>
        </div>
    )
})

export default Profile