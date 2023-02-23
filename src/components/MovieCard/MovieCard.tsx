import React, { FC } from 'react';
import {IMovie} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";

interface IMovieCardProps {
    movie:IMovie
}

const MovieCard:FC<IMovieCardProps> = ({movie}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {title,poster_path,genre_ids,id,vote_average}= movie

    // genres.forEach((item) => {
    //     if (genre_ids.includes(item.id)) {
    //         genreOfMovie.push(item.name)
    //     }
    // })

    const toDetails = () =>{
        navigate(`/${id}`)
    }

    return (
        <div>
            <div onClick={toDetails}>dfgdf</div>
        </div>
    );
};

export {MovieCard}