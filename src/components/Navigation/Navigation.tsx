import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.hook";

const Navigation = () => {
    const [query, setQuery] = useSearchParams({page: '1'})
    const {totalPages} = useAppSelector(state => state.movieReducer);


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
        <div>
            <button onClick={goPrevious}>prev</button>
            <button onClick={goNext}>next</button>

        </div>

    );
};

export default Navigation;