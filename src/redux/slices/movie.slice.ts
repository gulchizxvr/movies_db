import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


import {movieService} from "../../services";

import {IMovie, IResponse} from "../../interfaces";
import { IMoviesDetails } from "../../interfaces";
import {IMoviesState} from "../../interfaces";


const initialState: IMoviesState = {
    movies: [],
    movie: null,
    currentMovie: false,
    error: undefined,
    loading:false
}


const getMovies = createAsyncThunk<IMovie[],number>(
    'movieSlice/getMovies',
    async (page:number,{rejectWithValue}) => {
        try {
            const {data}:{data:IResponse} = await movieService.getMovies(page)
            return data.results
            }
        catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCurrentMovie = createAsyncThunk<IMoviesDetails,number>(
    'movieSlice/getCurrentMovie',
    async (id,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovie(id)
            return data
        }
        catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMoviesWithGenre = createAsyncThunk<IMovie[], { genre:string, page:number }>(
    'movieSlice/getMoviesWithGenre',
        async ({genre,page}, {rejectWithValue}) => {
            try {
                const {data} = await movieService.getMoviesGenre(genre,page)
                return data.results

            } catch (e) {
                const err = e as AxiosError
                return rejectWithValue(err.response?.data)
            }
        }
)

const getSearchedMovies = createAsyncThunk<IMovie[], { value:string, page:number }>(
    'movieSlice/getSearchedMovies',
        async ({value,page}, {rejectWithValue}) => {
            try {
                const {data}:{data:IResponse} = await movieService.getSearchedMovies(value,page)
                return data.results

            } catch (e) {
                const err = e as AxiosError
                return rejectWithValue(err.response?.data)
            }
        }
)



const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                state.movies = action.payload
                state.loading = false
            })
            .addCase(getMovies.pending, state => {
                state.loading = true
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.error = action.error.message
            })


            .addCase(getMoviesWithGenre.fulfilled, (state, action) => {
                state.movies = action.payload
                state.loading = false
            })
            .addCase(getMoviesWithGenre.pending, (state) => {
                state.loading = true
            })
            .addCase(getMoviesWithGenre.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(getSearchedMovies.fulfilled,(state,action)=>{
                state.movies = action.payload
                state.loading = false
            })
            .addCase(getSearchedMovies.pending, (state) => {
                state.loading = true
            })
            .addCase(getSearchedMovies.rejected, (state, action) => {
                state.error = action.error.message
            })


            .addCase(getCurrentMovie.fulfilled, (state,action) =>{
                state.movie = action.payload
                state.loading = false
            })
            .addCase(getCurrentMovie.rejected, (state, action)=>{
                state.error = action.error.message
            })
            .addCase(getCurrentMovie.pending, (state) => {
                state.loading = true
            })


})

const {reducer: movieReducer} = movieSlice

const movieActions = {
    getMovies,
    getMoviesWithGenre,
    getCurrentMovie,
    getSearchedMovies
}

export {
    movieReducer, movieActions
}