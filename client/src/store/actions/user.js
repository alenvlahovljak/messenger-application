import { createUserAPI } from "../../services/api";
import { addError, removeError } from "./errors";
import { removeInfoMessage } from "./infoMessages";
import * as actionTypes from "../actionTypes";

export const handleCreateUser = (user) => {
	return {
		type: actionTypes.SET_NEW_USER,
		user
	};
};

export const handleSetAvatar = (user) => {
	return {
		type: actionTypes.SET_USER_AVATAR,
		user
	};
};

export const createUser = (data) => {
	return async (dispatch) => {
		try {
			const user = await createUserAPI("POST", "/users", data);
			dispatch(handleCreateUser(user.data));
			dispatch(removeError());
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response));
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

export const getAllUsersExpectCurrent = (users) => {
	return {
		type: actionTypes.GET_ALL_USERS_EXPECT_CURRENT,
		users
	};
};
