import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {useSearchParams} from "react-router-dom";
import {genreActions} from "../../redux/slices/genre.slice";
import css from "./Header.module.css"

import Buttons from '../Buttons/Buttons';
import Profile from '../Profile/Profile';
import {profileActions} from "../../redux/slices/profile.slice";
import { Switcher } from '../Switcher/Switcher';

const Header: FC = () => {

    const dispatch = useAppDispatch()
    const {genres} = useAppSelector(state => state.genreReducer)
    const {theme} = useAppSelector(state => state.themeReducer)


    const [query, setQuery] = useSearchParams()

    const [searching, setSearching] = useState("");

    useEffect(() => {
        dispatch(genreActions.getGenres())
        dispatch(profileActions.getInfoProfile())
    }, [dispatch])


    const submit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (searching) {

            query.set("search", searching)

            query.delete('genre')
            setQuery(query)
        } else {
            query.delete("search")
            setQuery("")
        }
    }


    const clear = () => {
        setSearching('')
        query.delete("search")
        setQuery(query)
    }



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void=> {
        query.delete('page')
        setSearching(event.target.value);
    };



    return (
        // <div>
        //     {genres ? <div>Ganru</div> : null}
        //
        //     <div>
        //         <input type="text" placeholder={"Введіть слово для пошуку"}
        //                onChange={handleChange}
        //                id={'searchValue'}
        //                value={searching}
        //         />
        //         {searching &&
        //             <button onClick={clear}>
        //                 {/*<ClearIcon fontSize="small"/>*/}
        //             </button>}
        //
        //         <button onClick={submit}>search</button>
        //     </div>
        //     <Profile/>
        //     <Buttons/>
        // </div>
        <div className={css.header}>

            <div className={css.head}>

                <Switcher/>

                <div className={css.inputLine}>
                    <input type="text" placeholder={"Введіть слово для пошуку"}
                           // onChange={changeValue}
                           id={'searchValue'}/>
                    {searching &&
                        <button className={css.clearButton} onClick={() => clear()}>
                            {/*<ClearIcon fontSize="small"/>*/}
                            gkasjdgkl
                        </button>}

                    <button onClick={submit} disabled={!searching}>search</button>
                </div>

                <Profile/>

            </div>

            {/*<div className={css.buttonsGenre}>*/}
            {/*    {currentMovie &&*/}
            {/*        (query.get("search") ?*/}

            {/*            <div className={`${css.removeSearch} ${theme==='light' ? css.light : css.dark}`} */}
            {/*                 onClick={() => deleteSearch()}>*/}
            {/*                <h3>Delete "{query.get("search")}"</h3>*/}
            {/*            </div>*/}

            {/*            :*/}

            {/*            <Buttons/>)}*/}
            {/*</div>*/}

        </div>



    );
};

export {Header}