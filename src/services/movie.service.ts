import { url } from "../config";
import { axiosService } from "./axios.service";
import {IResponse} from "../interfaces";
import {AxiosResponse} from "axios";
import {IMoviesDetails} from "../interfaces";
import {IGenreState} from "../interfaces";

export type AxiosRes<T> = Promise<AxiosResponse<T>>

const movieService = {
    getMovies:(page:number=1):AxiosRes<IResponse>=> axiosService.get(url.getAllMovie, {params:{page}}),
    getGenre : ():AxiosRes<IGenreState> => axiosService.get(url.getGenre),
    getMovie : (id:number):AxiosRes<IMoviesDetails> => axiosService(`${url.getMovie}/${id}`),
    getMoviesGenre: (genre:string,page=1):AxiosRes<IResponse> => axiosService(url.getAllMovie, {params:{with_genres:genre,page}}),
    getSearchedMovies: (value: string, page:number = 1):AxiosRes<IResponse> => axiosService(url.findMovies, {params:{query:value,page}}),
    getInfo: ():Promise<[]>=> axiosService.get(url.getInfo)
}

export {movieService}