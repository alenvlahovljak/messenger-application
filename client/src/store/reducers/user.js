import { SET_NEW_USER, SET_USER_AVATAR, GET_ALL_USERS_EXPECT_CURRENT } from "../actionTypes";

const DEFAULT_STATE = {
	user: {},
	users: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_NEW_USER:
			return {
				user: action.user
			};
		case SET_USER_AVATAR:
			return {
				user: action.user
			};
		case GET_ALL_USERS_EXPECT_CURRENT:
			return {
				...state,
				users: action.users
			};
		default:
			return state;
	}
};
