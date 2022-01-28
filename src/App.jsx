import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as TYPES from './store/actions';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SignUpForm } from './components/SignUpForm/index.jsx';
import { CreateMovie } from './components/CreateMovie/index.jsx';
import { UploadMovie } from './components/UploadMovie/index.jsx';
import { SearchMovies } from './components/SearchMovies/index.jsx';
import { MoviesTable } from './components/MoviesTable/index.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import {destroy, get} from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(null);

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const moviesCount = useSelector(state => state.moviesCount);
  const loading = useSelector(state => state.loading);


  async function deleteMovie(id) {
    console.log(loading)
    dispatch({
      type: TYPES.SET_LOADING,
      payload: true
    })
    console.log(loading)

    const r = await destroy(`movies/${id}`);
    dispatch({
        type: TYPES.DELETE_MOVIE,
        payload: id
    });
    console.log(loading)
    dispatch({
      type: TYPES.SET_LOADING,
      payload: false
    })
    console.log(loading)
  }

  async function fetchMovies(params={}) {
    dispatch({
      type: TYPES.SET_LOADING,
      payload: true
    })
    
    const r = await get('movies', params);
    dispatch({
      type: TYPES.FETCH_MOVIES,
      payload: r
    })  
    dispatch({
      type: TYPES.SET_LOADING,
      payload: false
    })
  }

  useEffect(() => {
    function checkUserAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch({
          type: TYPES.CREATE_USER,
          payload: token
        });
        setIsAuthenticated(true);
      }
    }

    checkUserAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies()
    }
  }, [isAuthenticated])

  useEffect(() => {
    setCount(Math.ceil(moviesCount/20));
    if (movies.length < 20 && moviesCount > 0) {
      fetchMovies()
    }
  },[moviesCount])

  return (
    <>
      {isAuthenticated ?

        <div className="app">
          <header>
            <nav>
              <div className="nav-wrapper teal lighten-1 z-depth-1">
                <span className="brand-logo center logo">MOVIES</span>
              </div>
            </nav>
          </header>
          {loading && <LinearProgress />}

          <div className="container pt-10px">

            <>
              <div className="actions">
                <div className="actions__buttons">
                  <CreateMovie />
                  <UploadMovie />
                </div>
                <SearchMovies fetchMovies={fetchMovies} />
              </div>

              <Stack spacing={2} className="pagination-custom">
                <Pagination count={count} onClick={(e) => e.target.innerText ? fetchMovies({offset: parseInt(e.target.innerText)*20-20}) : alert('Something is wrong..Please, try again')} size="small" hidePrevButton hideNextButton />
              </Stack>

                {movies && movies.length > 0
              ?
                <MoviesTable movies={movies} deleteMovie={deleteMovie} />
              :
              <p>You have no movies here yet...🎬</p>
              }
            </>

          </div>
        </div> :
        <SignUpForm setIsAuthenticated={setIsAuthenticated} />
      }
    </>
  )
}

export {
  App
}
