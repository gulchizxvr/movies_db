import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IProfile } from "../../interfaces";
import {movieService} from "../../services";

const initialState: IProfile = {
    avatar: null,
    username: null
}

const getInfoProfile = createAsyncThunk<IProfile,void>(
    'getInfoProfile',
    async (_,{rejectWithValue}) => {
        try {
            const {data} : {data:IProfile} = await movieService.getInfo()
            return data
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


const profileSlice = createSlice({
    name:"themeSlice",
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getInfoProfile.fulfilled, (state, action)=> {
                state.avatar = action.payload.avatar
                state.username = action.payload.username
            })
})

const {reducer : profileReducer} = profileSlice

const profileActions = {
    getInfoProfile
}

export {profileActions, profileReducer}