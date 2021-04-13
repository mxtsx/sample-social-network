import pi from "./ProfileInfo.module.css";
import {CreateField, Input, Textarea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../types/types";
import React from "react";
import {Button} from "antd";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = Extract<keyof ProfileType, string>

const ProfileDescriptionForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, handleSubmit}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div className={pi.descriptionForm}>
                <div className={pi.elementOfDescriptionForm}>
                        <span>
                            <b>Your name and some information about you:</b>
                        </span>
                </div>
                <div className={pi.elementOfDescriptionForm}>
                    {CreateField<ProfileTypeKeys>("Your name", "fullName", Input)}
                </div>
                <div className={pi.elementOfDescriptionForm}>
                    {CreateField<ProfileTypeKeys>("Some information", "aboutMe", Input)}
                </div>
                <div className={pi.searchJob}>
                    <span>
                        {CreateField<ProfileTypeKeys>("", "lookingForAJob", Input, "checkbox", "Looking for a job:", [], pi.searchJob)}
                    </span>
                </div>
                <div className={pi.elementOfDescriptionForm}>
                    <span>
                        {CreateField<ProfileTypeKeys>("Your skills description", "lookingForAJobDescription", Textarea)}
                    </span>
                </div>
                <div>
                    <div className={pi.elementOfDescriptionForm}>
                        <span>
                            <b>Your Contacts:</b>
                        </span>
                    </div>
                    <div>
                        {Object.keys(profile.contacts).map(key => {
                            return <div className={pi.elementOfDescriptionForm} key={key}>
                                <b>{CreateField(key, `contacts.${key}`, Input)}</b>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <Button type={"default"} htmlType={"submit"} size={"small"}>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    )
}

const ProfileDescriptionReduxForm = reduxForm<ProfileType, PropsType>({form: "profileDescriptionForm"})(ProfileDescriptionForm)

export default ProfileDescriptionReduxForm