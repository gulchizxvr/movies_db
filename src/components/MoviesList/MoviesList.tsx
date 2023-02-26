import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {MovieCard} from "../MovieCard/MovieCard";
import {genreActions} from "../../redux/slices/genre.slice";


const MoviesList = () => {

    const dispatch = useAppDispatch()
    const {movies, totalResults, loading, error} = useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams()


    let page: number
    (query.get('page') !== null ? page = Number(query.get("page")) : page = 1)

    let genre = query.get('genre')

    let value = query.get('search')

    useEffect(() => {
        if (value) {
            dispatch(movieActions.getSearchedMovies({value, page}))
        }
        else if (genre){
            dispatch(movieActions.getMoviesWithGenre({genre, page}))
        }
        else {
            dispatch(movieActions.getMovies(Number(page)))
        }
        dispatch(genreActions.getGenres())
    }, [page, value,genre])


    if (totalResults < 0)
        return <div>
            <h1>No movies matching your search</h1>
        </div>


    if (error) {
        return <div>
            <p>{JSON.stringify(error)}</p>
        </div>
    }

    if (loading) {
        return <div>
            <p>loading</p>
        </div>
    }

    return (
        <div>
            {movies.map((movie, index) => <MovieCard movie={movie} key={index}/>)}
        </div>
    );
};

export {MoviesList}