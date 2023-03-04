import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {MoviePage} from "./pages/MoviePages/MoviePage";
import {MoviesDetail} from "./pages/MoviesDetail/MoviesDetail";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MoviePage/>}/>
                <Route path={':id'} element={<MoviesDetail/>}/>
            </Routes>
        </div>
    )
}

export default App;
