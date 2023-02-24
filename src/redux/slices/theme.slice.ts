import {createSlice} from "@reduxjs/toolkit";

import { ITheme } from "../../interfaces";


const initialState:ITheme = {
    theme: 'light'
}

const themeSlice = createSlice({
    name:"themeSlice",
    initialState,
    reducers:{
        changeTheme: (state, action)=>{
            state.theme = action.payload
        }
    }
})

const {reducer : themeReducer, actions : {changeTheme}} = themeSlice

const themeActions = {
    changeTheme
}

export {
    themeReducer, themeActions
}