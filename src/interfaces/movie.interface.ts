import {IGenre} from "./genre.interface";


export interface IMoviesDetails {
    adult: false,
    backdrop_path: string,
    belong_to_collection: {
        id: string,
        name: string,
        poster_path: string | null,
        backdrop_path: string | null
    },
    budget: number,
    genres: IGenre[],
    homepage: string | null,
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    production_companies: [{ id: number, logo_path: string | null, name: string, original_country: string }],
    release_date: Date,
    runtime: number,
    status: string,
    title:string,
    vote_average: number,

}