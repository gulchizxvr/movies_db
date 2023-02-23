import React from 'react';
import { MoviesList } from '../../components/MoviesList/MoviesList';

import Navigation from "../../components/Navigation/Navigation";

const MoviePage = () => {
    return (
        <div>
            <MoviesList/>
            <Navigation/>
        </div>
    );
};

export {MoviePage}