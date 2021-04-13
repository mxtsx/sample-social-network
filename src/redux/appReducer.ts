import {userAuthentication} from "./authReducer";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

const GET_INITIALIZED = 'app/GET_INITIALIZED'

const initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action: ActionTypes): AppReducerInitialStateType => {
    switch(action.type) {
        case GET_INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state
    }
}

export const actions = {
    isInitialized: () => ({type: GET_INITIALIZED} as const)
}

export const getInitialized = (): AppReducerThunkType => {
    return async (dispatch) => {
        await dispatch(userAuthentication())
        dispatch(actions.isInitialized())
    }
}

type AppReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type AppReducerThunkType = BaseThunkType<ActionTypes>

export default appReducer