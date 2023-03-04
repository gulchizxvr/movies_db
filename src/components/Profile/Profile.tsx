import React, {FC} from 'react';

import {useAppSelector} from "../../hooks";
import "./profile.style.scss"

const Profile:FC = () => {


    const {username,avatar} = useAppSelector(state => state.profileReducer)
    const {theme} = useAppSelector(state => state.themeReducer)


    return (
        <div className={`profile ${theme==="light" ? "light" : "dark"}`}>
            <h4>Welcome, {username}!</h4>
            {avatar && <img src={"https://image.tmdb.org/t/p/w300" + avatar.tmdb?.avatar_path} alt=""/>}
        </div>
    );
};

export {Profile}