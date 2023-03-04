import React, {FC, useEffect} from 'react';
import {IGenre, IMovie} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import css from "./MovieListCard.module.css"

import {genreActions} from "../../redux/slices/genre.slice";
import {Rating} from "@mui/material";


import {Badge} from '../Badge/Badge';

interface IMovieCardProps {
    movie:IMovie
}

const MovieCard:FC<IMovieCardProps> = ({movie}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {title,poster_path,genre_ids,id,vote_average}= movie





    const {genres} = useAppSelector(state => state.genreReducer)
    const {theme} = useAppSelector(state => state.themeReducer)

    const genresOfMovie:string[] = []


    genres.forEach((item) => {
        if (genre_ids.includes(item.id)) {
            genresOfMovie.push(item.name)
        }
    })

    const toDetails = () =>{
        navigate(`/${id}`)
    }

    return (
        <div className={`${css.card} ${theme === 'light' ? css.light : css.dark}`} onClick={toDetails}>

            <div className={css.poster}>
                {(poster_path) ? <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt={poster_path}/>  :
                    <div className={css.errorPoster}>
                        <h2>Error image</h2></div>}
            </div>

            <div className={css.badge}>
                {genresOfMovie.map((genre, index) => <Badge genre={genre} key={index}/>)}
            </div>
            <div className={css.text}><h4>{title}</h4></div>
            {vote_average && <Rating value={vote_average} precision={0.1} max={10} readOnly/>}
            {vote_average}
        </div>
    );
}

export {MovieCard}