import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useNavigate, useParams} from "react-router-dom";

import "./movieDetailPage.style.scss"

import {CBadge} from "@coreui/react";
import { Rating } from '@mui/material';
import {Loading} from "../../components/Loading/Loading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {blue, green} from "@mui/material/colors";

const MovieDetailPage: FC = () => {

    const {id} = useParams()
    const idParams = Number(id)

    const {movie, loading} = useAppSelector(state => state.movieReducer);

    const defaultTheme:string|null = window.localStorage.getItem("theme")
    const [theme, _] = useState(defaultTheme);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(movieActions.getCurrentMovie(idParams))
    }, [idParams,dispatch])

    if (loading) return <Loading/>

    if (!movie) return null

    const {
        poster_path,
        original_title,
        overview,
        genres,
        production_companies,
        runtime,
        tagline,
        title,
        vote_average,
        status,
        release_date
    } = movie


    return (
        <div className={`wrapperDetail ${theme === "light" ? "light":"dark"}`}>
            <div className="buttonPrevious">
                <ArrowBackIosNewIcon fontSize={"large"} sx={{color: theme === 'light' ? blue[500] : green[500]}} onClick={()=> navigate(-1)}>Previous
                    page</ArrowBackIosNewIcon>
            </div>
            <div className="poster">

                {poster_path && <img src={"https://image.tmdb.org/t/p/w400" + poster_path} alt={title}/>}

                {(!loading && !poster_path) &&
                    <div className='errorPoster'>
                        <h2>Error image</h2>
                    </div>}

                <div className="rating">
                    {vote_average && <Rating value={vote_average} precision={0.1} max={10} readOnly/>}
                    <h5>Rate: {vote_average}</h5>
                </div>

            </div>

            <div className="description">

                <h1>{title}</h1>

                <div className="overview">

                    <div className="badges">
                        {genres?.map(genre =>
                            <div key={genre.id}>
                                <CBadge color={theme === "light" ? "warning" : "danger"} shape="rounded-pill"
                                        style={{margin: "3px"}}>
                                    <span>{genre.name}</span>
                                </CBadge>
                            </div>
                        )}
                    </div>

                    <h5 style={{marginTop: '8px'}}>Original title: {original_title}</h5>

                    <h2>Overview:</h2>
                    <p>{overview}</p>

                    {tagline &&
                        <div>
                            <h5>Tagline:</h5>
                            <p>{tagline}</p>
                        </div>}

                </div>

                <div className='info'>
                    {status === 'Released'
                        ?
                        (<h3>Release date : {release_date.toString()}</h3>)
                        :
                        (<h3>Not released</h3>)}

                    <h4>Running time: {runtime} minutes</h4>


                    <div className='productBy'>
                        <h3>Product by:</h3>
                        <div className='logoCompanies'>

                            {production_companies?.map(company =>
                                <div key={company.id} className='logo'>
                                    {company.logo_path ?
                                        <img src={"https://image.tmdb.org/t/p/w300" + company.logo_path}
                                             alt={company.name}/> :
                                        <h4>| {company.name} |</h4>}
                                </div>
                            )}

                        </div>

                    </div>

                </div>


            </div>
        </div>
    );
};

export {MovieDetailPage}