import React, { FC } from 'react';

import { useAppSelector } from '../../hooks';
import {IGenre} from "../../interfaces";
import "./button.style.scss"

interface IButtonProps{
    genre:IGenre,
    setGenre: Function
}
const Button:FC<IButtonProps> = ({genre,setGenre}) => {

    const {theme}=useAppSelector(state => state.themeReducer)

    return (
        <div className='oneButton'>
            <button className={`${theme === "light" ? "lightButton": "darkButton"}`}
                    onClick={()=> setGenre(genre.id)}>{genre.name}</button>
        </div>
    );
};

export {Button}