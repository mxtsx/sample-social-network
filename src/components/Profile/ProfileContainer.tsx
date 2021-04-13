import React from "react";
import Profile from "./Profile";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
    actions,
    getCurrentUserStatus,
    setNewProfilePhotos,
    setUserProfile,
    setUserProfileUpdate,
    setUserStatus
} from "../../redux/profileReducer";
import {getId} from "../../redux/authSelectors";
import {getProfile, getProfileIsFetching, getStatus} from "../../redux/profileSelectors";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../types/types";
import withError from "../../hoc/withError";

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
type MapStateToPropsType = {
    id: number,
    profile: ProfileType,
    status: string,
    isFetching: boolean,
}
type MapDispatchToPropsType = {
    setUserProfile: (id: number | null) => void,
    getCurrentUserStatus: (id: number) => void,
    setUserStatus: (status: string) => void,
    setUserProfileUpdate: (profile: ProfileType) => void,
    setNewProfilePhotos: (photos: File) => void,
}
type OwnPropsType = {
    match: any,
    history: any
}

class ProfileContainer extends React.PureComponent<PropsType>{
    refreshProfilePage() {
        let userId = this.props.match.params.userID
        if(!userId){
            userId = this.props.id
            if(!userId){
                this.props.history.push('/login')
                return
            }
        }
        this.props.setUserProfile(userId)
        this.props.getCurrentUserStatus(userId)
    }
    componentDidMount() {
        this.refreshProfilePage()
    }
    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if((prevProps.match.params.userID !== this.props.match.params.userID)
            || (prevProps.status !== this.props.status)) {
            this.refreshProfilePage()
        }
    }
    render() {
        if(!this.props.profile || this.props.isFetching) {
            return <Preloader />
        }
        return <Profile {...this.props} isOwner={!this.props.match.params.userID}/>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        id: getId(state),
        profile: getProfile(state),
        status: getStatus(state),
        isFetching: getProfileIsFetching(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserProfile, getCurrentUserStatus, setUserStatus,
        setUserProfileUpdate, setNewProfilePhotos, actions}),
    withError,
    withRouter)
(ProfileContainer)