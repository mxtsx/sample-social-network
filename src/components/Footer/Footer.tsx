import f from "./Footer.module.css";
import React from "react";

const Footer: React.FC = React.memo((props) => {
    return(
        <footer className={f.footer}>
            <div><span>&copy; 2021</span></div>
            <div className={f.flaticonRef}>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> and <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
    )
})

export default Footer