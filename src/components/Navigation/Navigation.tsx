import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.hook";
import css from "./Navigation.module.css"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {blue, green} from '@mui/material/colors';


const Navigation = () => {
    const [query, setQuery] = useSearchParams({page: '1'})
    const {totalPages} = useAppSelector(state => state.movieReducer);
    const {theme} = useAppSelector(state => state.themeReducer);


    const goPrevious = () =>{
        const previous = (Number(query.get('page'))-1)

        if (previous < 0) return

        previous && query.set('page', previous.toString())
        setQuery(query)
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
    }

    const goNext = () =>{
        const next = Number(query.get('page'))+1

        if (totalPages === next) return

        next && query.set('page', next.toString())
        setQuery(query)
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
    }

    return (
        <div className={css.navigation}>


                <div className={css.prevButton}><ArrowBackIosNewIcon fontSize={"large"}
                                                                     sx={{color: theme === 'light' ? blue[500] : green[500]}}
                                                                     onClick={goPrevious}>Previous
                    page</ArrowBackIosNewIcon></div>

            {totalPages > 0 &&
                <h3 className={`${theme === 'light' ? css.light : css.dark}`}> Page: {query.get('page')} of {totalPages}</h3>}


                <div className={css.nextButton}><ArrowForwardIosIcon fontSize={"large"}
                                                                     sx={{color: theme === 'light' ? blue[500] : green[500]}}
                                                                     onClick={goNext}>Next
                    page</ArrowForwardIosIcon></div>
        </div>
    );
}


export default Navigation;