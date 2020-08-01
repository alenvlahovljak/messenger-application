import { ADD_INFO_MESSAGE, REMOVE_INFO_MESSAGE } from "../actionTypes";

export default (state = { infoMsg: null }, action) => {
	switch (action.type) {
		case ADD_INFO_MESSAGE:
			return { ...state, infoMsg: action.infoMsg };
		case REMOVE_INFO_MESSAGE:
			return {
				...state,
				infoMsg: null
			};
		default:
			return state;
	}
};
