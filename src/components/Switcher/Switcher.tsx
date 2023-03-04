import React, {useEffect, useState} from 'react';



import css from "./Switcher.module.css"
import {Switch} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import {useAppDispatch} from "../../hooks/redux.hook";
import { themeActions } from '../../redux/slices/theme.slice';


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
        <div className={`${css.switcher} ${theme==='light' ? css.light : css.dark}`}>
            <LightModeIcon/>
            <Switch onClick={() => change()} checked={theme === "dark"}/>
            <DarkModeIcon/>
        </div>
    );
};

export {Switcher}