import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {useParams, useSearchParams} from "react-router-dom";
import {IMoviesDetails} from "../../interfaces";


const MoviesDetail: FC = () => {

    const {id} = useParams()
    const idParams = Number(id)

    const {movie, loading} = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getCurrentMovie(idParams))
    }, [idParams])

    if (loading) return <div>Loa</div>

    if (!movie) return null

    const {
        poster_path,
        original_title,
        overview,
        genres,
        production_companies,
        release_date,
        runtime,
        status,
        tagline,
        title,
        vote_average
    } = movie

    return (
        <div>
            <p>{status}</p>
            <p>{original_title}</p>
        </div>
    );
};

export {MoviesDetail}