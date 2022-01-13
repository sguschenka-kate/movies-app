import initialState from "./initialState";
import * as TYPES from './actions';

const reducer = (state = [{
    title: "Blazing Saddles",
    year: 1974,
    format: "VHS",
    actors: [
      "Mel Brooks",
      "Clevon Little",
      "Harvey Korman",
      "Gene Wilder",
      "Slim Pickens",
      "Madeline Kahn"
    ]
  }, {
    title: "Blazing Saddles",
    year: 1974,
    format: "VHS",
    actors: [
      "Mel Brooks",
      "Clevon Little",
      "Harvey Korman",
      "Gene Wilder",
      "Slim Pickens",
      "Madeline Kahn"
    ]
  }], action) => {
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