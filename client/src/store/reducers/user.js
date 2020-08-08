import { CREATE_USER, SET_USER_SOCKET_ID, SET_USER_AVATAR, GET_ALL_USERS_EXPECT_CURRENT } from "../actionTypes";

const DEFAULT_STATE = {
	currentUser: {},
	users: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				currentUser: action.user
			};
		case SET_USER_SOCKET_ID:
			return {
				currentUser: action.user
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
