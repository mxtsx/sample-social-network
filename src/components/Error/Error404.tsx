import React from "react";
import {Alert} from "antd";

const Error404: React.FC = React.memo(() => {
    return(
        <div>
            <Alert message="Error"
                   description="Page doesn't exist"
                   type="error"
                   showIcon
            />
        </div>
    )
})

export default Error404