import React, {ChangeEvent} from "react";
import pi from "./ProfileInfo.module.css"
import {useDispatch} from "react-redux";
import {setNewProfilePhotos} from "../../../redux/profileReducer";

const UploadPhotoInput = React.memo(() => {
    const dispatch = useDispatch()
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(setNewProfilePhotos(e.target.files[0]))
        }
    }
    return(
        <div className={pi.inputWrapper}>
            <input type="file" onChange={mainPhotoSelected}/>
        </div>
    )
})

export default UploadPhotoInput