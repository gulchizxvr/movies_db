import {IMovie} from "./response.interface";
import {IMoviesDetails} from "./movie.interface";

export interface IMoviesState {
    movies: IMovie[],
    movie: IMoviesDetails | null,
    currentMovie: boolean,
    error: string|undefined,
    loading: boolean
}