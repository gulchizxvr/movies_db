import React from 'react';
import { MoviesList } from '../../components/MoviesList/MoviesList';

import Navigation from "../../components/Navigation/Navigation";
import {Header} from "../../components/Header/Header";

const MoviePage = () => {
    return (
        <div>
            <Header/>
            <MoviesList/>
            <Navigation/>
        </div>
    );
};

export {MoviePage}