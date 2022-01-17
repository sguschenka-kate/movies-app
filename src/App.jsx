import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as TYPES from './store/actions';
import { get }from './api';
import { SignUpForm } from './components/SignUpForm/index.jsx';
import { CreateMovie } from './components/CreateMovie/index.jsx';
import { UploadMovie } from './components/UploadMovie/index.jsx';
import { SearchMovies } from './components/SearchMovies/index.jsx';
import { MoviesTable } from './components/MoviesTable/index.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import {destroy} from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);


  async function deleteMovie(id) {
    setLoading(true);
    const r = await destroy(`movies/${id}`);
    console.log(r)
    dispatch({
        type: TYPES.DELETE_MOVIE,
        payload: id
    });
    setLoading(false)
  }

  async function fetchMovies(params={}) {
    setLoading(true);
    const r = await get('movies', params);
    dispatch({
      type: TYPES.FETCH_MOVIES,
      payload: r
    })
    setLoading(false)
  }

  useEffect(() => {
    function checkUserAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch({
          type: TYPES.CREATE_USER,
          payload: token
        });
        return setIsAuthenticated(true);
      }
    }

    checkUserAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies()
    }
  }, [isAuthenticated])

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
                <CreateMovie />
                <UploadMovie />
                <SearchMovies fetchMovies={fetchMovies} />
              </div>
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
