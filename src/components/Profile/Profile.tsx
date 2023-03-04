import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/redux.hook";
import css from "./Profile.module.css"

const Profile:FC = () => {


    const {username,avatar} = useAppSelector(state => state.profileReducer)
    const {theme} = useAppSelector(state => state.themeReducer)


    return (
        <div className={`${css.profile} ${theme==="light" ? css.light : css.dark}`}>
            <h4>Welcome, {username}!</h4>
            {avatar && <img src={"https://image.tmdb.org/t/p/w300" + avatar.tmdb?.avatar_path} alt=""/>}
        </div>
    );
};

export default Profile;