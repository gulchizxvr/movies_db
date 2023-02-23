import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {MovieCard} from "../MovieCard/MovieCard";


const MoviesList = () => {

    const dispatch = useAppDispatch()
    const {movies, totalResults, loading,error} = useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams()

    let page: number = Number(query.get("page"))
    let genre = query.get('genre')
    let value = query.get('search')

    useEffect(() => {
        dispatch(movieActions.getMovies(page))
    }, [page])

    if (totalResults < 0)
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
            <p>{JSON.stringify(loading)}</p>
        </div>
    }

    return (
        <div>
            {totalResults > 0 ? (movies.map((movie,index)=> <MovieCard key={index} movie={movie}/>)) : null}
        </div>
    );
};

export {MoviesList}