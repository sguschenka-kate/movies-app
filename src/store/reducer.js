import initialState from "./initialState";
import * as TYPES from './actions';

const reducer = (state = initialState, action) => {
	switch(action.type) {

        case TYPES.CREATE_MOVIE: {
            return {
                ...state,
                movies: action.payload
            }
        }

        case "ADD_NEW_CONTACT":
		break;

        case "TOGGLE_CONTACT_FORM":
        break;
	}

    return state;
}

export {
    reducer
}