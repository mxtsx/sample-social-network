import React, {useEffect, useState} from "react"
import pi from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import iconMan from "../../../avatarMan.svg"
import iconWoman from "../../../avatarWoman.svg"
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileDescriptionReduxForm from "./ProfileDescriptionForm";
import {ProfileContactsType, ProfileType} from "../../../types/types";
import {Button} from "antd";
import UploadPhotoInput from "./UploadPhotoInput";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingIsFetching} from "../../../redux/usersSelectors";
import {followUser, unfollowUser} from "../../../redux/usersReducer";
import {actions, isUserFollowed} from "../../../redux/profileReducer";
import {getIsFollowed} from "../../../redux/profileSelectors";
import {userPossiblyIsWoman} from "../../../utils/genderValidator";

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    profile: ProfileType,
    userStatus: string,
    isFetching: boolean,
    isOwner: boolean
}
type MapDispatchToPropsType = {
    setUserStatus: (status: string) => void,
    setUserProfileUpdate: (profile: ProfileType) => void,
    setNewProfilePhotos: (photos: File) => void
}

const ProfileInfo: React.FC<PropsType> = React.memo(({profile, userStatus, setUserStatus, isOwner, isFetching, setUserProfileUpdate}) => {
    const [profileEditMode, setProfileEditMode] = useState(false)
    const isFollowed = useSelector(getIsFollowed)
    const followingIsFetching = useSelector(getFollowingIsFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(actions.getNewProfile(null))
            dispatch(actions.userIsFollowed(null))
        }
    }, [])

    useEffect(() => {
        dispatch(isUserFollowed(profile.userId as number))
    }, [profile.userId])

    const follow = (userId: number) => {
        dispatch(followUser(userId))
        dispatch(actions.userIsFollowed(true))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
        dispatch(actions.userIsFollowed(false))
    }

    const enableEditMode = () => {
        setProfileEditMode(true)
    }

    const onSubmit = async (formData: ProfileType) => {
        await setUserProfileUpdate(formData)
        setProfileEditMode(false)
    }

    if (isFetching || isFollowed === null) {
        return <Preloader/>
    }
    return(
        <div className={pi.profileInfoContainer}>
            <div className={pi.photo}>
                <img src={profile?.photos?.large || (userPossiblyIsWoman(profile.fullName) ? iconWoman : iconMan)} alt=""/>
                {isOwner && !profileEditMode ?
                <div>
                    <div className={pi.buttonUnderProfilePhoto}>
                        <Button className={pi.buttonUnderProfilePhoto} type={"default"} onClick={enableEditMode}>
                            Edit Page
                        </Button>
                    </div>
                </div>
                    : isOwner ?
                    <UploadPhotoInput />
                    : isFollowed ?
                                <Button className={pi.buttonUnderProfilePhoto} type={"default"} disabled={followingIsFetching.some(id => id === profile.userId)} onClick={() => unfollow(profile.userId as number)}>
                                    Unfollow
                                </Button>
                            : (!isFollowed && !isOwner) &&
                    <Button className={pi.buttonUnderProfilePhoto} type={"default"} disabled={followingIsFetching.some(id => id === profile.userId)} onClick={() => follow(profile.userId as number)}>
                    Follow
                    </Button>
                }
            </div>
            {!profileEditMode ?
                <ProfileDescription profile={profile} userStatus={userStatus} setUserStatus={setUserStatus}
                                    isOwner={isOwner} isFetching={isFetching}/>
                : <ProfileDescriptionReduxForm profile={profile} initialValues={profile} onSubmit={onSubmit}/>
            }
        </div>
    )
})

type ProfileDescriptionType = {
    profile: ProfileType,
    userStatus: string,
    isOwner: boolean,
    isFetching: boolean,
    setUserStatus: (status: string) => void
}

const ProfileDescription: React.FC<ProfileDescriptionType> = React.memo(({profile, userStatus, setUserStatus, isOwner, isFetching}) => {
    const areContacts = Boolean(Object.values(profile.contacts).map(v => v).filter(r => r)[0])
    return(
        <div className={pi.description}>
            <div className={pi.name}>
                <span>
                    {profile?.fullName}
                </span>
            </div>
            <ProfileStatus userStatus={userStatus} setUserStatus={setUserStatus} isOwner={isOwner} isFetching={isFetching}/>
            {profile?.aboutMe &&
            <div className={pi.elementOfDescription}>
                <span>
                    <b>About me: </b> {profile?.aboutMe}
                </span>
            </div>
            }
            <div>
                <div className={pi.elementOfDescription}>
                    <span>
                        <b>Looking for a job:</b> {profile?.lookingForAJob ? "yes" : "no"}
                    </span>
                </div>
                {profile?.lookingForAJob &&
                <div className={pi.elementOfDescription}>
                    <span>
                        <b>My skills</b>: {profile?.lookingForAJobDescription}
                    </span>
                </div>
                }
            </div>
            {areContacts &&
            <div>
                <div className={pi.contact}>
                    <span>
                        <b>Contact me:</b>
                    </span>
                </div>
                <div>
                    {Object.keys(profile.contacts).map((key) => {
                        return <Contacts key={key} contactKey={key} contactValue={profile.contacts[key as keyof ProfileContactsType]}/>
                    })}
                </div>
            </div>}
        </div>
    )
})

type ContactPropsType = {
    contactKey: string,
    contactValue: string,
}

const Contacts: React.FC<ContactPropsType> = React.memo(({contactKey, contactValue, ...props}) => {
    return(
        <div {...props}>
            {contactValue &&
                <div className={pi.elementOfDescription}><p className={pi.contacts}><b>{contactKey}:</b> {contactValue}</p></div>}
        </div>
    )
})

export default ProfileInfo