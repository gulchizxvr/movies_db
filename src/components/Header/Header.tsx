import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {useSearchParams} from "react-router-dom";
import {genreActions} from "../../redux/slices/genre.slice";

import Buttons from '../Buttons/Buttons';

const Header: FC = () => {

    const dispatch = useAppDispatch()
    const {genres} = useAppSelector(state => state.genreReducer)
    const {theme} = useAppSelector(state => state.themeReducer)

    const [query, setQuery] = useSearchParams()

    const [searching, setSearching] = useState("");

    useEffect(() => {
        dispatch(genreActions.getGenres())
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
        <div>
            {genres ? <div>Ganru</div> : null}

            <div>
                <input type="text" placeholder={"Введіть слово для пошуку"}
                       onChange={handleChange}
                       id={'searchValue'}
                       value={searching}
                />
                {searching &&
                    <button onClick={clear}>
                        {/*<ClearIcon fontSize="small"/>*/}
                    </button>}

                <button onClick={submit}>search</button>
            </div>
            <Buttons/>
        </div>


    );
};

export {Header}