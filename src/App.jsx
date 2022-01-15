import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as TYPES from './store/actions';
import { fetchService }from './api/fetchService';
import { ModalWindow } from './components/ModalWindow';
import { Card } from './components/Card';
import { useDispatch } from 'react-redux';
import { SignUpForm } from './components/SignUpForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  movies && console.log(movies)

  useEffect(() => {
    async function getMovies() {
      const response = await fetchService.getMovies();
      dispatch({
        type: TYPES.GET_MOVIES,
        payload: response
      })
    }
  }, [])


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

          <div className="container pt-10px">
            <ModalWindow  />
            <div className="row">
              {movies && movies.length > 0 && movies.map(movie => {
                return <Card movie={movie} key={movie.id} />
              })}
            </div>
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
