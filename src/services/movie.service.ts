import { url } from "../config";
import { axiosService } from "./axios.service";

const movieService = {
    getMovies:(page:number):AxiosRes<IArticles>=> axiosService.get(url.getAllMovie, {params:{page}}),
    getGenre : ():Promise<{}> => axiosService.get(url.getGenre),
    getMovie : (id:number):Promise<{}> => axiosService(`${url.getMovie}/${id}`),
    getMoviesGenre: (genre:string,page:number):Promise<[]> => axiosService(url.getAllMovie, {params:{with_genres:genre,page}}),
    getSearchedMovies: (value:string,page:number):Promise<[]> => axiosService(url.findMovies, {params:{query:value,page}}),
    getInfo: ():Promise<[]>=> axiosService.get(url.getInfo)
}

export {movieService}