import React from 'react';

import { MoviesList } from '../../components/MoviesList/MoviesList';
import {Navigation} from "../../components/Navigation/Navigation";
import {Header} from "../../components/Header/Header";

import "./moviePage.style.scss"

import {useAppSelector} from "../../hooks";

const MoviePage = () => {
    const {theme}=useAppSelector(state => state.themeReducer)
    const {totalResults} = useAppSelector(state => state.movieReducer)

    return (
        <div className={`wrapper ${theme === "light" ? "light":"dark"}`}>
            <Header/>
            <MoviesList/>
            {totalResults>1 && <Navigation/> }

        </div>
);
};

export {MoviePage}