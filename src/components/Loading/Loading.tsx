import React from 'react';

import ReactLoading from "react-loading";
import "./Loading.style.scss"
import {useAppSelector} from "../../hooks";


const Loading = () => {
    const {theme} = useAppSelector(state => state.themeReducer);
    return (
        <div className={`loading ${theme === "light" ? "light" : "dark"}`}><ReactLoading type="spokes" color="#0000FF" height={150} width={100} /></div>
    );
};

export {Loading}