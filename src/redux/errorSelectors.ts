import {AppStateType} from "./reduxStore";

export const getError = (state: AppStateType) => {
    return state.error.error
}