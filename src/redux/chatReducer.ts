import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {chatAPI, MessageAPIType, StatusAPIType} from "../api/chatApi";
import {Dispatch} from "redux";
import {v4} from 'uuid';
import {arraysAreEqual} from "../utils/stateIsGreater";

const CHAT_MESSAGES_RECEIVED = 'chat/CHAT_MESSAGES_RECEIVED'
const SET_STATUS = 'chat/SET_STATUS'

const initialState = {
    messages: [] as MessageChatType[],
    status: '' as StatusAPIType
}

const chatReducer = (state = initialState, action: ActionTypes): ChatReducerInitialStateType => {
    switch(action.type) {
        case CHAT_MESSAGES_RECEIVED:
            if(!state.messages[state.messages.length - 1] && ((!arraysAreEqual(state.messages, action.payload.messages) || (action.payload.messages.length <= 3)))
                || ((action.payload.messages.length === 1) && state.messages[state.messages.length - 1])){
                return {
                    ...state,
                    messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v4()}))]
                        .filter((m, index, array) => index >= array.length - 100)
                }
            } else if ((state.messages[state.messages.length - 1]
                && (!arraysAreEqual(state.messages, action.payload.messages)
                && (state.messages[state.messages.length - 1].message !== action.payload.messages[state.messages.length].message)))) {
                                return {
                                    ...state,
                                    messages: [...state.messages, ...action.payload.messages.slice(state.messages.length - 1).map(m => ({...m, id: v4()}))]
                                }
                            }
            return {...state, messages: state.messages}
        case SET_STATUS:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: MessageAPIType[]) => ({type: CHAT_MESSAGES_RECEIVED, payload: {messages}} as const),
    statusChanged: (status: StatusAPIType) => ({type: SET_STATUS, payload: {status}} as const)
}

let _newMessageHandler: ((messages: MessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _newStatusHandler: ((status: StatusAPIType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if(_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _newStatusHandler
}

export const startMessagesListening = (): ChatReducerThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe("sendMessage", newMessageHandlerCreator(dispatch))
        chatAPI.subscribe("setStatus", newStatusHandlerCreator(dispatch))
    }
}

export const stopMessagesListening = (): ChatReducerThunkType => {
    return async (dispatch) => {
        chatAPI.stop()
        chatAPI.unsubscribe("sendMessage", newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe("setStatus", newStatusHandlerCreator(dispatch))
    }
}


export const sendMessageToChat = (message: string): ChatReducerThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}

type ChatReducerInitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ChatReducerThunkType = BaseThunkType<ActionTypes>
export type MessageChatType = MessageAPIType & {id: string}

export default chatReducer