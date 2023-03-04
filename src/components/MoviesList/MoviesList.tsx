import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {MovieCard} from "../MovieCard/MovieCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {genreActions} from "../../redux";
import "./movieList.style.scss"

import {Loading} from "../Loading/Loading";


const MoviesList = () => {

    const dispatch = useAppDispatch()
    
    const {movies, loading, error} = useAppSelector(state => state.movieReducer);
    const {theme} = useAppSelector(state => state.themeReducer)

    const [query, setQuery] = useSearchParams()


    let page: number
    (query.get('page') !== null ? page = Number(query.get("page")) : page = 1)
    let genre:string|null  = query.get('genre')
    let value:string|null = query.get('search')

    useEffect(() => {
        dispatch(movieActions.selectMovie(true))
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
    }, [page, value, genre, dispatch])



    if (movies.length === 0 && !loading)
        return <div className={`posterNoneMovies ${theme === 'light' ? "light" : "dark"}`}>
            <h1>No movies matching your search</h1>
        </div>

    if(loading) return <Loading/>

    if (error) return <div className={`state ${theme === 'light' ? "light" : "dark"}`}><h2>Error:{JSON.stringify(error)}</h2></div>


    return (
        <div className="listWrap">
            <div className="cardWrap">
                {movies.map((movie, index) => <MovieCard movie={movie} key={index}/>)}

            </div>
        </div>
    );
};



export {MoviesList}