import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {MovieCard} from "../MovieCard/MovieCard";


const MoviesList = () => {

    const dispatch = useAppDispatch()
    const {movies, totalResults, loading,error} = useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams()

    let page: number|null = Number(query.get("page"))
    let genre = query.get('genre')
    let value = query.get('search')

    useEffect(() => {
        dispatch(movieActions.getMovies(page))
    }, [page])

    if (totalResults <= 0)
        return <div>
            <h1>No movies matching your search</h1>
        </div>


    if (error) {
        return <div>
            <p>{JSON.stringify(error)}</p>
        </div>
    }

    if(loading){
        return <div>
            <p>loading</p>
        </div>
    }

    return (
        <div>
            {movies.map((movie,index)=> <MovieCard movie={movie} key={index}/> )}
        </div>
    );
};

export {MoviesList}