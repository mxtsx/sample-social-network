import preloaderIcon from "./preloader.svg"
import React from "react";
import p from "./Preloader.module.css"

type PropsType = {
    height?: string,
    width?: string,
    maxHeight?: string,
    maxWidth?: string
}

const Preloader: React.FC<PropsType> = React.memo(({height = "70%", width = "100%", maxWidth = "100%", maxHeight = "100%"}) => {
    return(
        <div className={p.preloaderWrapper} style={{ height: height, width: width }}>
            <img src={preloaderIcon} alt="Preloader" style={{maxWidth: maxWidth, maxHeight: maxHeight}}/>
        </div>
    )
})

export default Preloader