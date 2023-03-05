import React, {FC, useEffect, useState} from 'react';

import {useAppDispatch} from "../../hooks";
import { themeActions } from '../../redux';
import {Switch} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import "./switcher.style.scss"


const Switcher:FC = () => {

    const dispatch = useAppDispatch()

    const defaultTheme = window.localStorage.getItem("theme")

    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        dispatch(themeActions.changeTheme(theme))
    }, [theme,dispatch])

    const change = () => {
        theme === "light" ? window.localStorage.setItem('theme', 'dark') : window.localStorage.setItem('theme', 'light')
        setTheme(window.localStorage.getItem("theme"))
        dispatch(themeActions.changeTheme(theme))
    }

    return (
        <div className={`switcher ${theme==='light' ? "light" :"dark"}`}>
            <LightModeIcon/>
            <Switch onClick={() => change()} checked={theme === "dark"}/>
            <DarkModeIcon/>
        </div>
    );
};

export {Switcher}