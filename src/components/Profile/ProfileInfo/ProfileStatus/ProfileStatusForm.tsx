import {InjectedFormProps, reduxForm} from "redux-form";
import pi from "../ProfileInfo.module.css"
import {maxLength} from "../../../../utils/validators";
import {CreateField, Input} from "../../../common/FormControls/FormControls";
import React from "react";
import {StatusFormPropsType} from "./ProfileStatus";

const maxLength20 = maxLength(20)

const ProfileStatusInput: React.FC<InjectedFormProps<StatusFormPropsType>> = React.memo(({handleSubmit}) => {
    return(
        <form onBlur={handleSubmit} className={pi.status}>
            {CreateField('', 'status', Input, undefined, '', [maxLength20])}
        </form>
    )
})

const ProfileStatusForm = reduxForm<StatusFormPropsType>({form: "statusForm"})(ProfileStatusInput)

export default ProfileStatusForm