import {IGenre, IGenreState} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services";
import {AxiosError} from "axios";

const initialState: IGenreState = {
    genres: []
}


const getGenres = createAsyncThunk<IGenre[], void>(
    'genreSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data}: { data: IGenreState } = await movieService.getGenre()
            return data.genres
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


const genreSlice = createSlice({
    name: "genreSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload
            })
})
const {reducer: genreReducer} = genreSlice

const genreActions = {
    getGenres
}

export {genreReducer,genreActions}

