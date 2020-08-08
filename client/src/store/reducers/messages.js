import { NEW_MESSAGE } from "../actionTypes";

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case NEW_MESSAGE:
			return [...state, { ...action.message }];
		default:
			return state;
	}
};
