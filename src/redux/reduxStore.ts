import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
import chatReducer from "./chatReducer";
import errorReducer from "./errorReducer";

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    chat: chatReducer,
    error: errorReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

type RootReducer = typeof reducers
export type AppStateType = ReturnType<RootReducer>
export type InferActionsTypes<T> = T extends {[key: string]: (...args:any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export default store