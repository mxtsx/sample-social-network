import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getError} from "../redux/errorSelectors";
import {setError} from "../redux/errorReducer";
import {Alert} from "antd";

function withError<WCP> (Component: React.ComponentType<WCP>) {
    return React.memo((props: WCP) => {
        const error = useSelector(getError)
        const dispatch = useDispatch()
        useEffect(() => {
            return () => {
                if(error) {
                    dispatch(setError(null))
                }
            }
        }, [error])
        if (error) {
            return <><Alert
                message="Error"
                description={error}
                type="error"
                showIcon
            /></>
        }
        return (<Component {...props} />)
    })
}

export default withError