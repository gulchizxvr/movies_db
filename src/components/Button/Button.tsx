import React from 'react';
import { useAppSelector } from '../../hooks/redux.hook';



import {IGenre} from "../../interfaces";

const Button = ({genre,setGenre}:{genre:IGenre,setGenre:Function}) => {

    const {theme}=useAppSelector(state => state.themeReducer)

    return (
        <div>
            <button onClick={()=> setGenre(genre.id)}>{genre.name}</button>
        </div>
    );
};

export {Button}