import React, {useEffect, useState} from 'react';



import "./switcher.style.scss"
import {Switch} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import {useAppDispatch} from "../../hooks";
import { themeActions } from '../../redux';


const Switcher = () => {

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