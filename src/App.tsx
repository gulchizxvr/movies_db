import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux.hook";
import {movieActions} from "./redux";

const App = () => {


  const {movies} = useAppSelector(state => state.movieReducer);
  const dispatch = useAppDispatch()

useEffect(()=> {
  dispatch(movieActions.getMovies(1))
}, [dispatch])

  return (

      <div>
        {movies.map(movie=> <div>{movie.title}</div>)}
      </div>
  );
}

export default App;
