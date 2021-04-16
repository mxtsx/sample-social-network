import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import c from "./Chat.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getStatus} from "../../redux/chatSelectors";
import {
    MessageChatType,
    sendMessageToChat,
    startMessagesListening,
    stopMessagesListening
} from "../../redux/chatReducer";
import iconMan from "../../avatarMan.svg"
import iconWoman from "../../avatarWoman.svg"
import {Button} from "antd";
import TextArea from "antd/es/input/TextArea";
import withLoginRedirect from "../../hoc/withLoginRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {userPossiblyIsWoman} from "../../utils/genderValidator";
import withError from "../../hoc/withError";

const Chat = React.memo(() => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return(
        <div className={c.chat}>
            <AllMessages />
            <AddMessageForm />
        </div>
    )
})

const AllMessages = React.memo(() => {
    const messages = useSelector(getMessages)
    const [isAutoScroll, setIsAutoScroll] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) <= 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        scrollToBottom()
    })
    useEffect(() => {
        isAutoScroll && scrollToBottom()
    }, [messages, isAutoScroll])

    return(
        <div className={c.allMessages} onScroll={scrollHandler}>
            {!messages.length && <Preloader maxWidth={"50%"} maxHeight={"50%"} />}
            {messages.map((m: MessageChatType) => <ChatMessage message={m} key={m.id} />)}
            <div ref={messagesEndRef} />
        </div>
    )
})

const ChatMessage: React.FC<{ message: MessageChatType }> = React.memo(({message}) => {
    return(
        <div>
            <div className={c.chatMessage}>
                <img src={message.photo || (userPossiblyIsWoman(message.userName) ? iconWoman : iconMan)} alt="" className={c.profilePhoto}/>
                <span><b>{message.userName}</b></span>
            </div>
            <div>
                <span>{message.message}</span>
            </div>
            <hr/>
        </div>
    )
})

const AddMessageForm = React.memo(() => {
    const [message, setMessage] = useState('')
    const status = useSelector(getStatus)
    const dispatch = useDispatch()
    const statusPendingOrError = status === "Pending..." || status === "Error";
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if(e.currentTarget.value === '\n') {
            return
        }
        if (e.currentTarget.value === ' ') {
            return
        }
        setMessage(e.currentTarget.value)
    }
    const sendMessageHandler = () => {
        if(!statusPendingOrError) {
            if(!message) {
                return
            }
            dispatch(sendMessageToChat(message))
            setMessage('')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!statusPendingOrError && (e.shiftKey && e.code === 'Enter')) {
            if (!message) {
                return
            }
            e.preventDefault()
            dispatch(sendMessageToChat(message))
            setMessage('')
        }
    }
    return(
        <div className={c.addMessageForm}>
            <div className={c.textInput}>
                <TextArea placeholder={"Hold Shift+Enter to send the message.\nOr use the button under the form."} value={message}
                          onChange={onChangeHandler}
                          onKeyDown={onKeyDownHandler}
                          cols={15}
                />
            </div>
            <div>
                <Button type={"default"} disabled={statusPendingOrError} onClick={sendMessageHandler}>
                    Send
                </Button>
            </div>
        </div>
    )
})

export default compose<React.ComponentType>(withError, withLoginRedirect)(Chat)