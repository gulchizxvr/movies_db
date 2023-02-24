import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {useSearchParams} from "react-router-dom";
import {genreActions} from "../../redux/slices/genre.slice";

const Header:FC = () => {

    const dispatch = useAppDispatch()
    const {genres} = useAppSelector(state => state.genreReducer)

    const [query, setQuery] = useSearchParams()

    useEffect(()=> {
        dispatch(genreActions.getGenres())
    }, [dispatch])

    return (
        <div>
            {genres ? <div>Ganru</div> : null }
        </div>
    );
};

export {Header}