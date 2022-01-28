import initialState from "./initialState";
import * as TYPES from './actions';
import axios from "axios";

const reducer = (state = initialState, action) => {
	switch(action.type) {


        case TYPES.CREATE_USER: {
            const token = action.payload;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('token', token);

            return {
                ...state,
                token: token
            }
        }

        case TYPES.CREATE_MOVIE: {
            const movies = [
              ...state.movies,
              action.payload.data
            ];
            const moviesCount = state.moviesCount+1
            return {
                ...state,
                movies,
                moviesCount
            }
        }

        case TYPES.FETCH_MOVIES: {
            const movies = action.payload.data;

            const moviesCount = action.payload.meta.total

          return {
            ...state,
            moviesCount,
            movies
          }
        }

        case TYPES.IMPORT_MOVIES: {
          const movies = action.payload.data;

          const moviesCount = action.payload.meta.total

          return {
            ...state,
            moviesCount,
            movies
          }
        }


        case TYPES.SET_LOADING: {
          const loading = action.payload;

          return {
            ...state,
            loading
          }
        }

        case TYPES.DELETE_MOVIE: {
          const id = action.payload
          const movies = state.movies.filter(movie => movie.id !== id);
          const moviesCount = state.moviesCount - 1;
          return {
            ...state,
            movies,
            moviesCount
          }
        }

        case TYPES.SORT_MOVIES: {
          const movies = action.payload.data;
          return {
            ...state,
            movies
          }
        }

        case TYPES.FETCH_MOVIE: {
          const id = action.payload;
          const movie = state.movies.filter(movie => movie.id === id);
          localStorage.setItem('movie', JSON.stringify(movie))

          return {
            ...state,
            movie
          }
        }

        case "TOGGLE_CONTACT_FORM":
        break;
	}

    return state;
}

export {
    reducer
}