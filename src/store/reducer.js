import initialState from "./initialState";
import * as TYPES from './actions';

const reducer = (state = initialState, action) => {
	switch(action.type) {


        case TYPES.CREATE_USER: {

            return {
                ...state,
                user: action.payload
            }
        }

        case TYPES.CREATE_MOVIE: {

            return {
                ...state,
                movie: action.payload
            }
        }

        case TYPES.GET_MOVIES: {
          return {
            ...state,
            movies: action.payload
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