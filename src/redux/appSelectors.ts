import {AppStateType} from "./reduxStore";

export const getIsInitialized = (state: AppStateType) => {
    return state.app.isInitialized
}