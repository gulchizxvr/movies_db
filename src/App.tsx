import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MoviePage} from "./pages/MoviePage/MoviePage";
import {MovieDetailPage} from "./pages/MovieDetailPage/MovieDetailPage";
import "./App.scss"

const App = () => {
    return (

            <Routes>
                <Route path={'/'} element={<MoviePage/>}/>
                <Route path={':id'} element={<MovieDetailPage/>}/>
            </Routes>)
}

export default App;
