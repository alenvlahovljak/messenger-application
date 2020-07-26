import { apiCall, apiCallAsync, createUserAPI, setAvatarAPI } from "../../services/api";
import { addError, removeError } from "./errors";
import * as actionTypes from "../actionTypes";
import { connect } from "react-redux";

export const handleCreateUser = (user) => {
	return {
		type: actionTypes.SET_NEW_USER,
		user
	};
};

export const handleGetUser = (user) => {
	return {
		type: actionTypes.GET_CURRENT_USER,
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
			dispatch(addError(err.response));
		}
	};
};

export const getUser = ({ _id }) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return apiCall("GET", `/users/${_id}`)
				.then((user) => {
					dispatch(getUser(user));
					dispatch(removeError());
					resolve();
				})
				.catch((err) => {
					dispatch(addError(err));
					reject();
				});
		});
	};
};

export const setAvatar = ({ _id }, data) => {
	return async (dispatch) => {
		try {
			const user = await createUserAPI("POST", `/users/${_id}/avatar`, data);
			dispatch(handleSetAvatar(user.data));
			dispatch(removeError());
		} catch (err) {
			const { data } = err.response;
			dispatch(addError(data.message));
		}
	};
};
