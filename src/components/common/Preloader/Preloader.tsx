import preloaderIcon from "./preloader.svg"
import React from "react";
import p from "./Preloader.module.css"

const Preloader: React.FC = React.memo((props) => {
    return(
        <div className={p.preloaderWrapper}>
            <img src={preloaderIcon} alt=""/>
        </div>
    )
})

export default Preloader