import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IState} from "../../interfaces";
import {movieService} from "../../services";
import {AxiosPromise} from "axios";
import RejectedValue = jest.RejectedValue;


const initialState: IState = {
    movies: []
}
export interface

const getMoviesList = createAsyncThunk(
    'movieSlice/getMoviesList',
    async ({page}, {rejectedWithValue}) => {
        try {
            const {data} = await movieService.getMovies(page)
            return data
        } catch (e) {
            return rejectedWithValue.response.data()
        }
    }
)

const getMovies = createAsyncThunk<>(
    'movieSlice/getMovieList',
    async (page:number,{rejectWithValue}): RejectedValue<any>|[]=> {
        try {
            const {data} = await movieService.getMovie(page)
            return data
            }
            catch (e) {
                return rejectWithValue(e.response.data)
            }
    }
)


const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getMoviesList.fulfilled, (state, action) => {
                state.movies = action.payload
            })
})

const {reducer: movieReducer} = movieSlice

const movieActions = {
    getMoviesList
}

export {
    movieReducer, movieActions
}