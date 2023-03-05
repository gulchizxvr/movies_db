import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import ClearIcon from '@mui/icons-material/Clear';
import {genreActions} from "../../redux";
import {profileActions} from "../../redux";
import {Buttons} from '../Buttons/Buttons';
import {Profile} from '../Profile/Profile';
import {Switcher} from '../Switcher/Switcher';

import './header.style.scss'

const Header: FC = () => {

    const dispatch = useAppDispatch()

    const {theme} = useAppSelector(state => state.themeReducer)
    const {currentMovie} = useAppSelector(state => state.movieReducer)


    const [query, setQuery] = useSearchParams()

    const [searching, setSearching] = useState("");
    console.log(searching);

    useEffect(() => {
        dispatch(genreActions.getGenres())
        dispatch(profileActions.getInfoProfile())
    }, [dispatch])

    const submit: React.MouseEventHandler<HTMLButtonElement> = ():void => {
        if (searching) {
            query.delete('genre')
            query.set("search", searching)
            setQuery(query)
        }
    }

    const clear = ():void => {
        query.delete("search")
        setQuery(query)
        setSearching('')
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        query.delete('page')
        setSearching(event.target.value);
    };


    return (
        <div className={`header ${theme === "light" ? "light" : "dark"}`}>

            <div className='head'>

                <Switcher/>

                <div className='inputLine'>
                    <input type="text" placeholder={"Введіть слово для пошуку"}
                           onChange={handleChange}
                           id={'searchValue'}
                           value={searching}/>
                    {searching &&
                        <button className='clearButton' onClick={() => clear()}>
                            <ClearIcon fontSize="small"/>

                        </button>}

                    <button onClick={submit} disabled={!searching}>search</button>
                </div>

                <Profile/>

            </div>

            <div className='buttonsGenre'>
                {currentMovie &&
                    (query.get("search") ?

                        <div className={`removeSearch`}
                             onClick={() => clear()}>
                            <h3>Delete "{query.get("search")}"</h3>
                        </div>

                        :

                        <Buttons/>)}
            </div>

        </div>


    );
};

export {Header}