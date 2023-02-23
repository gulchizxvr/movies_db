import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {useParams, useSearchParams} from "react-router-dom";
import {IMoviesDetails} from "../../interfaces";


const MoviesDetail = () => {

    const {id} = useParams()
    const idParams = Number(id)

    const {movie} = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getCurrentMovie(idParams))
    }, [idParams])

    const {status,original_title} = movie

    return (
        <div>
            <p>{id} </p>
            <p>{original_title}</p>

        </div>
    );
};

export {MoviesDetail}