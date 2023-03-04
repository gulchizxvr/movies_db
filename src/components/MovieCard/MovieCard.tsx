import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import { IMovie} from "../../interfaces";
import { useAppSelector} from "../../hooks";
import "./movieCard.style.scss"
import {BadgeSpan} from '../Badge/BadgeSpan';
import {Rating} from "@mui/material";

interface IMovieCardProps {
    movie:IMovie
}

const MovieCard:FC<IMovieCardProps> = ({movie}) => {

    const navigate = useNavigate()

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
        <div className={`card ${theme === 'light' ? "dark" : "light"}`} style={{border:"none"}} onClick={toDetails}>

            <div className="posterCard">
                {(poster_path) ? <img src={"https://image.tmdb.org/t/p/w300" + poster_path} alt={poster_path}/>  :
                    <div className="errorPoster">
                        <h2>Error image</h2></div>}
            </div>

            <div className="badgeCustom">
                {genresOfMovie.map((genre, index) => <BadgeSpan genre={genre} key={index}/>)}
            </div>
            <div className="text"><h4>{title}</h4></div>

            <Rating value={vote_average} precision={0.1} max={10} readOnly/>
            {(vote_average) !== 0 ? <p>{vote_average}</p> : <p>'Without rating'</p>}
        </div>
    );
}

export {MovieCard}