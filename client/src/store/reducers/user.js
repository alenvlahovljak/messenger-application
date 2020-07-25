import { SET_NEW_USER } from "../actionTypes";

const DEFAULT_STATE = {
	user: {}
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_NEW_USER:
			return {
				user: action.user
			};
		default:
			return state;
	}
};
