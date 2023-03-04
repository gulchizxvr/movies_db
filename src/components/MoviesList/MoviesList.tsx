import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {MovieCard} from "../MovieCard/MovieCard";
import {genreActions} from "../../redux/slices/genre.slice";
import css from './MovieList.module.css'
import ReactLoading from "react-loading";


const MoviesList = () => {

    const dispatch = useAppDispatch()
    const {movies, totalResults, loading, error} = useAppSelector(state => state.movieReducer);
    const {theme} = useAppSelector(state => state.themeReducer)

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

    // if (loading) {
    //     return <div>
    //         <p>loading</p>
    //     </div>
    // }

    return (
        <div className={css.listWrap}>

            {loading &&  <div style={{height:"80vh", display:"flex", alignItems:"center" }}><ReactLoading type="spokes" color="#0000FF"
                                                                                                          height={150} width={100} /></div>}
            {error ?
                <div className={`${css.state} ${theme === 'light' ? css.light : css.dark}`}><h2>Error</h2></div> : null}

            <div className={css.cardWrap}>
                {movies.map((movie, index) => <MovieCard movie={movie} key={index}/>)}

            </div>
        </div>
    );
};



export {MoviesList}