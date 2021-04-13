import pi from "../ProfileInfo.module.css";
import React, {useState} from "react"
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusForm from "./ProfileStatusForm";

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = {
    userStatus: string,
    isOwner: boolean,
    isFetching: boolean,
}
type MapDispatchToPropsType = {
    setUserStatus: (status: string) => void
}
export type StatusFormPropsType = {
    status: string
}

const ProfileStatus: React.FC<PropsType> = React.memo(({userStatus, setUserStatus, isOwner, isFetching}) => {
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }
    const onBlurStatusChange = (formData: StatusFormPropsType) => {
        deactivateEditMode()
        if(formData.status !== userStatus){
            setUserStatus(formData.status)
        }
    }
    const initialValues = {
            status: userStatus
    }
    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div>
            {!editMode &&
            <div className={pi.status}>
                    <span onDoubleClick={isOwner ? activateEditMode : undefined}>
                        {userStatus || (isOwner ? "Double click to set the status" : "No status :(")}
                    </span>
            </div>
            }
            {editMode &&
            <ProfileStatusForm onSubmit={onBlurStatusChange} initialValues={initialValues}/>
            }
        </div>
    )
})

export default ProfileStatus