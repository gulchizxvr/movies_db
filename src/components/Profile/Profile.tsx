import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/redux.hook";

const Profile:FC = () => {

    const {username,avatar} = useAppSelector(state => state.profileReducer)


    return (
        <div>
            <h4>Welcome, {username}</h4>
            {avatar && <img src={"https://image.tmdb.org/t/p/w300" + avatar?.tmdb?.avatar_path} alt=""/>}
        </div>
    );
};

export default Profile;