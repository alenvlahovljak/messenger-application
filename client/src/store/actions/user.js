import { createUserAPI, setUserSocketIdAPI } from "../../services/api";
import { addError, removeError } from "./errors";
import { removeInfoMessage } from "./infoMessages";
import { setCurrentRoom } from "./rooms";
import * as actionTypes from "../actionTypes";

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

export const handleGetAllUsersExpectCurrent = (users) => {
	return {
		type: actionTypes.GET_ALL_USERS_EXPECT_CURRENT,
		users
	};
};

export const getAllUsersExpectCurrent = (currentUser, allUsers) => {
	const users = allUsers.filter((user) => user._id != currentUser._id);
	return async (dispatch) => {
		dispatch(handleGetAllUsersExpectCurrent(users));
		try {
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err));
		}
	};
};

export const setAvatar = ({ _id }, data) => {
	return async (dispatch) => {
		try {
			const user = await createUserAPI("POST", `http://localhost:8000/users/${_id}/avatar`, data);
			dispatch(handleSetAvatar(user.data));
			dispatch(removeError());
		} catch (err) {
			const { data } = err.response;
			dispatch(removeInfoMessage());
			dispatch(addError(data.message));
		}
	};
};
