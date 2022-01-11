import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchService } from './api/fetchService';
import * as TYPES from './store/actions';

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

      <button className='btn'>Create a movie</button>
      <button className='btn'>Create a movie</button>
      <button className='btn'>Create a movie</button>
      <button className='btn'>Create a movie</button>
    </div>
  );
}

export {
  App
}
