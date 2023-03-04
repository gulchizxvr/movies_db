import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hook";
import {movieActions} from "../../redux";
import {useParams, useSearchParams} from "react-router-dom";
import {IMoviesDetails} from "../../interfaces";
import css from "./MovieDetail.module.css"
import {CBadge} from "@coreui/react";

const MoviesDetail: FC = () => {

    const {id} = useParams()
    const idParams = Number(id)

    const {movie, loading} = useAppSelector(state => state.movieReducer);
    const {theme} = useAppSelector(state => state.themeReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getCurrentMovie(idParams))
    }, [idParams])

    if (loading) return <div>Loa</div>

    if (!movie) return null

    const {
        poster_path,
        original_title,
        overview,
        genres,
        production_companies,
        release_date,
        runtime,
        status,
        tagline,
        title,
        vote_average
    } = movie


    return (
        <div className={`${css.wrap} ${theme === "light" ? css.light : css.dark}`}>
            <div className={css.poster}>

                {poster_path && <img src={"https://image.tmdb.org/t/p/w400" + poster_path} alt={title}/>}

                {(!loading && !poster_path) &&
                    <div className={css.errorPoster}>
                        <h2>Error image</h2>
                    </div>}

                <div className={css.rating}>
                    {/*{vote_average && <Rating value={vote_average} precision={0.1} max={10} readOnly/>}*/}
                    <h5>Rate: {vote_average}</h5>
                </div>

            </div>

            <div className={css.description}>

                <h1>{title}</h1>

                <div className={css.overview}>

                    <div className={css.badges}>
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

                <div className={css.info}>
                    {/*{status === 'Released'*/}
                    {/*    ?*/}
                    {/*    <div><h4>Release date : {release_date}</h4></div>*/}
                    {/*    :*/}
                    {/*    <div><h3>Not released</h3></div>}*/}
                    <h4>Running time: {runtime} minutes</h4>


                    <div className={css.productBy}>

                        <h3>Product by:</h3>

                        <div className={css.logoCompanies}>

                            {production_companies?.map(company =>
                                <div key={company.id} className={css.logo}>
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

export {MoviesDetail}