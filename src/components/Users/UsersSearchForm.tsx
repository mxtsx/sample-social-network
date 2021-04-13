import React from "react";
import u from "./Users.module.css"
import {Field, Form, Formik} from 'formik';
import {useSelector} from "react-redux";
import {getCurrentFilter} from "../../redux/usersSelectors";
import {FilterType} from "../../redux/usersReducer";
import {Button} from "antd";
import {SearchOutlined, CloseSquareOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormFriendType = "null" | "true" | "false"

type FormType = {
    term: string,
    friend: FormFriendType
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const history = useHistory()
    const filter = useSelector(getCurrentFilter)
    const isSearch = !!history.location.search.length && history.location.search.substring(1, 12) !== "currentPage";
    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }
    const resetValues = () => {
        const filter: FilterType = {
            term: '',
            friend: null
        }
        onFilterChanged(filter)
    }
    return(
        <div className={u.searchForm}>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FormFriendType }}
                onSubmit={submit}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <Field placeholder="Enter friends name" type="text" name="term"/>
                            <Field as="select" name="friend">
                                <option value="null">All</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field>
                                <Button className={u.button} type="default" htmlType={"submit"} icon={<SearchOutlined/>} disabled={isSubmitting} shape={isSearch ? 'circle' : 'round'}>
                                    {!isSearch && "Search"}
                                </Button>
                            {isSearch &&
                                <Button className={u.button} type="default" onClick={resetValues} htmlType={"submit"} icon={<CloseSquareOutlined/>}  shape={"circle"}/>
                            }
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
})

export default UsersSearchForm