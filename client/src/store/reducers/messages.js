import { NEW_MESSAGE, LOAD_MESSAGES } from "../actionTypes";

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case NEW_MESSAGE:
			return [...state, { ...action.message }];
		case LOAD_MESSAGES:
			return [...action.messages];
		default:
			return state;
	}
};
