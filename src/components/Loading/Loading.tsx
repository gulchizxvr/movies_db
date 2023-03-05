import React, { FC } from 'react';

import ReactLoading from "react-loading";
import {useAppSelector} from "../../hooks";

import "./Loading.style.scss"


const Loading:FC = () => {
    const {theme} = useAppSelector(state => state.themeReducer);
    return (
        <div className={`loading ${theme === "light" ? "light" : "dark"}`}><ReactLoading type="spokes" color="#0000FF" height={150} width={100} /></div>
    );
};

export {Loading}