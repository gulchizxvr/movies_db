import React, {FC} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {blue, green} from '@mui/material/colors';

import "./navigation.style.scss"


const Navigation:FC= () => {
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
        <div className="navigation">


            <div className="prevButton">
                <ArrowBackIosNewIcon fontSize={"large"} sx={{color: theme === 'light' ? blue[500] : green[500]}} onClick={goPrevious}>Previous
                    page</ArrowBackIosNewIcon>
            </div>

            {totalPages > 1 &&
                <h3 className={`${theme === 'light' ? "light" : "dark"}`}> Page: {query.get('page')} of {totalPages}</h3>}


             <div className="nextButton"><ArrowForwardIosIcon fontSize={"large"}
                                                                     sx={{color: theme === 'light' ? blue[500] : green[500]}}
                                                                     onClick={goNext}>Next
                    page</ArrowForwardIosIcon></div>
        </div>
    );
}


export {Navigation}