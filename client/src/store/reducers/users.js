import {
	CREATE_USER,
	SET_USER_SOCKET_ID,
	SET_USER_AVATAR,
	ACTIVE_USERS,
	ADD_ACTIVE_USER,
	REMOVE_ACTIVE_USER
} from "../actionTypes";

const DEFAULT_STATE = {
	currentUser: {},
	users: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				currentUser: action.user
			};
		case SET_USER_SOCKET_ID:
			return {
				...state,
				currentUser: action.user
			};
		case SET_USER_AVATAR:
			return {
				...state,
				currentUser: action.user
			};
		case ACTIVE_USERS:
			return {
				...state,
				users: [...action.users]
			};
		case ADD_ACTIVE_USER:
			return {
				...state,
				users: [...state.users, { ...action.user }]
			};
		case REMOVE_ACTIVE_USER:
			const users = state.users.slice().filter((user) => user.socketId != action.socketId);
			return { ...state, users };
		default:
			return state;
	}
};
