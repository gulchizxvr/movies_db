import React, {FC, useEffect} from 'react';
import {IGenre, IMovie} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";

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
            <div onClick={toDetails} style={{border:"1px solid black"}}>
                <div>
                    {genresOfMovie.map((genre, index) => <div>{genre}</div>)}
                </div>

                <div><h4>{title}</h4></div>
                {vote_average}
            </div>
    );
};

export {MovieCard}