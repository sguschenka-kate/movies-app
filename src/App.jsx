import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchService } from './api/fetchService';
import * as TYPES from './store/actions';
import {store} from './store';

function App() {
  const [movie, setMovie] = useState({
    "title": "Blazing Saddles",
    "year": 1974,
    "format": "VHS",
    "actors": [
        "Mel Brooks",
        "Clevon Little",
        "Harvey Korman",
        "Gene Wilder",
        "Slim Pickens",
        "Madeline Kahn"
    ]
});

const movies = useSelector((state) => state.movies);
console.log(movies)

  const dispatch = useDispatch();

  async function createMovie() {
      const response = await fetchService.createMovie(movie);
      dispatch({
          type: TYPES.CREATE_MOVIE,
          payload: response
      })
  }

  return (
    <div className="App">

      <div className='container'>

        <button className='btn'>Create a movie</button>

        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export {
  App
}
