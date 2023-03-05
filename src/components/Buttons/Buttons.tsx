import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import {useAppSelector} from "../../hooks";
import { Button } from '../Button/Button';

import "./buttons.style.scss"

const Buttons : FC = () => {
    let [query, setQuery] = useSearchParams();

    const {theme}=useAppSelector(state => state.themeReducer)
    const {genres} = useAppSelector(state => state.genreReducer)


    const setGenre = (id:number):void => {
        id > 0 ? query.set('genre', `${id}`) : query.delete('genre')
        query.set('page', "1")
        query.delete('search')
        setQuery(query)
    }

    if (query.get("genre")) {
        return (<div className="buttonsAll">
            <button className={`${theme === "light" ? "light" : "dark"}`} onClick={() => setGenre(0)}>Go to all genres</button>
        </div>)
    }

    return (<div className={`chooseGenre ${theme === "light" ? "light" : "dark"}`}>
            <h2>You can choose:</h2>
            <div className='buttons'>
                {genres.map((genre) => <Button genre={genre} setGenre={setGenre} key={genre.id}/>)}
            </div>
        </div>
    );
};
export {Buttons}