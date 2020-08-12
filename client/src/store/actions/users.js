import * as actionTypes from "../actionTypes";

import { createUserAPI, setUserSocketIdAPI, setAvatarAPI, indexActiveUsersAPI } from "../../services/api";

import { addError, removeError } from "./errors";
import { removeInfoMessage } from "./infoMessages";
import { setCurrentRoom } from "./rooms";

export const handleCreateUser = (user) => {
	return {
		type: actionTypes.CREATE_USER,
		user
	};
};

export const createUser = (data) => {
	return async (dispatch) => {
		try {
			const user = await createUserAPI("POST", "/users", data);
			dispatch(handleCreateUser(user.data));
			dispatch(setCurrentRoom(user.data));
			dispatch(removeError());
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response));
		}
	};
};

export const handleSetUserSocketId = (user) => {
	return {
		type: actionTypes.SET_USER_SOCKET_ID,
		user
	};
};

export const setUserSocketId = (data) => {
	return async (dispatch) => {
		try {
			const user = await setUserSocketIdAPI("PATCH", `/users/${data._id}/socket`, { socketId: data.socketId });
			dispatch(handleSetUserSocketId(user.data));
			dispatch(removeError());
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response));
		}
	};
};

export const handleSetAvatar = (user) => {
	return {
		type: actionTypes.SET_USER_AVATAR,
		user
	};
};

export const setAvatar = ({ _id }, data) => {
	return async (dispatch) => {
		try {
			const user = await setAvatarAPI("POST", `/users/${_id}/avatar`, data);
			dispatch(handleSetAvatar(user.data));
			dispatch(removeError());
		} catch (err) {
			const { data } = err.response;
			dispatch(removeInfoMessage());
			dispatch(addError(data.message));
		}
	};
};

export const handleActiveUsers = (users) => {
	return {
		type: actionTypes.ACTIVE_USERS,
		users
	};
};

export const activeUsers = ({ _id }) => {
	return async (dispatch) => {
		try {
			const users = await indexActiveUsersAPI("GET", `/users?currentUser=${_id}`);
			dispatch(handleActiveUsers(users.data));
		} catch (err) {
			const { data } = err.response;
			dispatch(removeInfoMessage());
			dispatch(addError(data.message));
		}
	};
};

export const addActiveUser = (user) => {
	return {
		type: actionTypes.ADD_ACTIVE_USER,
		user
	};
};

export const removeActiveUser = (socketId) => {
	return {
		type: actionTypes.REMOVE_ACTIVE_USER,
		socketId
	};
};
