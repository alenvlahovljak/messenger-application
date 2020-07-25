import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export default (state = { err: null }, action) => {
	switch (action.type) {
		case ADD_ERROR:
			return { ...state, err: action.err };
		case REMOVE_ERROR:
			return {
				...state,
				err: null
			};
		default:
			return state;
	}
};
