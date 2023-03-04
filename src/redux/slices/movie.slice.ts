import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


import {movieService} from "../../services";

import {IResponse} from "../../interfaces";
import {IMoviesDetails} from "../../interfaces";
import {IMoviesState} from "../../interfaces";


const initialState: IMoviesState = {
    currentMovie: false,
    movies: [],
    movie: null,
    error: undefined,
    loading: true,
    totalPages: 0,
    totalResults: 0
}


const getMovies = createAsyncThunk<IResponse, number>(
    'movieSlice/getMovies',
    async (page: number, {rejectWithValue}) => {
        try {
            const {data}: { data: IResponse } = await movieService.getMovies(page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCurrentMovie = createAsyncThunk<IMoviesDetails, number>(
    'movieSlice/getCurrentMovie',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovie(id)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMoviesWithGenre = createAsyncThunk<IResponse, { genre: string, page: number }>(
    'movieSlice/getMoviesWithGenre',
    async ({genre, page}, {rejectWithValue}) => {
        try {
            const {data}: {data:IResponse} = await movieService.getMoviesGenre(genre, page)
            return data

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getSearchedMovies = createAsyncThunk<IResponse, { value: string, page: number }>(
    'movieSlice/getSearchedMovies',
    async ({value, page}, {rejectWithValue}) => {
        try {
            const {data}: { data: IResponse } = await movieService.getSearchedMovies(value, page)
            return data

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        selectMovie: (state, action) => {
            state.currentMovie = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results
                state.loading = false
                state.totalPages = action.payload.total_pages
                state.totalResults = action.payload.total_results
            })
            .addCase(getMovies.pending, state => {
                state.loading = true
                state.movies = []
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })


            .addCase(getMoviesWithGenre.fulfilled, (state, action) => {
                state.movies = action.payload.results
                state.loading = false
                state.totalPages = action.payload.total_pages
                state.totalResults = action.payload.total_results
            })
            .addCase(getMoviesWithGenre.pending, (state) => {
                state.loading = true
            })
            .addCase(getMoviesWithGenre.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })


            .addCase(getSearchedMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results
                state.loading = false
                state.totalPages = action.payload.total_pages
                state.totalResults = action.payload.total_results
            })
            .addCase(getSearchedMovies.pending, (state) => {
                state.loading = true
                state.movies = []
            })
            .addCase(getSearchedMovies.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })


            .addCase(getCurrentMovie.fulfilled, (state, action) => {
                state.movie = action.payload
                state.loading = false
            })
            .addCase(getCurrentMovie.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
            })
            .addCase(getCurrentMovie.pending, (state) => {
                state.loading = true
                state.movie = null

            })


})

const {reducer: movieReducer, actions:{selectMovie}} = movieSlice

const movieActions = {
    getMovies,
    getMoviesWithGenre,
    getCurrentMovie,
    getSearchedMovies,
    selectMovie
}

export {
    movieReducer, movieActions
}