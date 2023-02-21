import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { movieReducer } from "./slices/movie.slice";


export const setupStore = configureStore({
    reducer:{
        movie: movieReducer
    }
})

