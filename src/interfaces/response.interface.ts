
export interface IResponse {
    page: number;
    results: IMovie[],
    total_pages: number,
    total_results: number

}

export interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview:string,
    poster_path:string,
    release_date: Date,
    title: string,
    vote_average: number,
}
