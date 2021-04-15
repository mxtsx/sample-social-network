import {BaseThunkType, InferActionsTypes} from "./reduxStore";

const SET_ERROR = 'error/SET_ERROR'

const initialState = {
    error: null as string | null
}

const errorReducer = (state = initialState, action: ActionTypes): ErrorReducerInitialStateType => {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export const actions = {
    errorSet: (error: string | null) => ({type: SET_ERROR, payload: {error}} as const)
}

export const setError = (error: string | null): ErrorReducerThunkType => {
    return async (dispatch) => {
        dispatch(actions.errorSet(error))
    }
}

type ErrorReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ErrorReducerThunkType = BaseThunkType<ActionTypes>

export default errorReducer