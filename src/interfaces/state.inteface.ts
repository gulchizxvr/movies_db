import {IMovie} from "./response.interface";
import {IMoviesDetails} from "./movie.interface";

export interface IMoviesState {
    movies: IMovie[],
    movie: IMoviesDetails | null,
    currentMovie: true | false,
    error: string|undefined,
    loading: boolean,
    totalPages: number,
    totalResults: number
}