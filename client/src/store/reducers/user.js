import { SET_NEW_USER, GET_CURRENT_USER, SET_USER_AVATAR } from "../actionTypes";

const DEFAULT_STATE = {
	user: {}
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_NEW_USER:
			return {
				user: action.user
			};
		case GET_CURRENT_USER:
			return {
				user: action.user
			};
		case SET_USER_AVATAR:
			return {
				user: action.user
			};
		default:
			return state;
	}
};
