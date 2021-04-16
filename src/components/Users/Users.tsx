import User from "./User/User";
import React, {useEffect} from "react"
import u from "./Users.module.css"
import buttonLeft from "../../buttonLeft.svg"
import buttonRight from "../../buttonRight.svg"
import buttonDoubleLeft from "../../buttonDoubleLeft.svg"
import buttonDoubleRight from "../../buttonDoubleRight.svg"
import Preloader from "../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentFilter,
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/usersSelectors";
import {FilterType, getUsers} from "../../redux/usersReducer";
import UsersSearchForm from "./UsersSearchForm";
import {useHistory} from "react-router";
import * as queryString from "querystring";

type PropsType = {}

type QueryStringType = {term?: string, friend?: string, currentPage?: string}

const Users: React.FC<PropsType> = React.memo(() => {
    const users = useSelector(getUsersSelector)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const isFetching = useSelector(getIsFetching)
    const filter = useSelector(getCurrentFilter)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        const query: QueryStringType = {}
        if(filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.currentPage = String(currentPage)
        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    useEffect(() => {
        const parsedQuery = queryString.parse(history.location.search.substring(1)) as QueryStringType
        let actualPage = currentPage
        let actualFilter = filter
        if(parsedQuery.term) actualFilter = {...actualFilter, term: parsedQuery.term}
        if(parsedQuery.friend) actualFilter = {...actualFilter, friend: parsedQuery.friend === "null" ? null : parsedQuery.friend === "true" ? true : false}
        if(parsedQuery.currentPage) actualPage = Number(parsedQuery.currentPage)
        dispatch(getUsers(pageSize, actualPage, actualFilter))
    },[])

    const getCurrentUsers = (page: number) => {
        dispatch(getUsers(pageSize, page, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(pageSize, 1, filter))
    }

    if(!users || isFetching){
        return <Preloader />
    }
    const totalPagesCount = Math.ceil(totalUsersCount/pageSize)
    return(
        <div className={u.container}>
            <div className={u.usersList}>
                <div className={u.searchFormAndPage}>
                    <UsersSearchForm onFilterChanged={onFilterChanged}/>
                    <div className={u.currentPage}><span><strong>Page {currentPage}</strong></span></div>
                </div>
                <div className={u.usersListAndButtons}>
                {currentPage > 1 ?
                    <div className={u.buttonContainer}>
                        <img src={buttonDoubleLeft} alt="" className={u.arrowButton} onClick={() => getCurrentUsers(currentPage/currentPage)}/>
                        <img src={buttonLeft} alt="" className={u.arrowButton} onClick={() => getCurrentUsers(currentPage - 1)}/>
                    </div>
                    :
                    <div className={u.buttonContainer}>
                    </div>
                }
                <span className={u.users}>
                {users.length ?
                    users.map(u => <User key={u.id} user={u}/>)
                    : <div>No users found :(</div>
                }
                    {users.length < pageSize &&
                    <div className={u.notAllUsers} />}
                </span>
                {!!users.length && currentPage !== totalPagesCount ?
                    <div className={u.buttonContainer}>
                        <img src={buttonRight} alt="" className={u.arrowButton}
                             onClick={() => getCurrentUsers(currentPage + 1)}/>
                        <img src={buttonDoubleRight} alt="" className={u.arrowButton}
                             onClick={() => getCurrentUsers(totalPagesCount)}/>
                    </div>
                    :
                    <div className={u.buttonContainer}>
                    </div>
                }
                </div>
            </div>
        </div>
    )
})

export default Users