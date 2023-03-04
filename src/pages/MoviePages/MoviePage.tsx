import React from 'react';
import { MoviesList } from '../../components/MoviesList/MoviesList';

import Navigation from "../../components/Navigation/Navigation";
import {Header} from "../../components/Header/Header";
import css from "./MoviePage.module.css"
import {useAppSelector} from "../../hooks/redux.hook";

const MoviePage = () => {
    const {theme}=useAppSelector(state => state.themeReducer)

    return (
        <div className={ `${css.wrapper} ${theme === "light" ? css.light : css.dark}`}>
            <Header/>
            <MoviesList/>
            <Navigation/>
        </div>
    );
};

export {MoviePage}