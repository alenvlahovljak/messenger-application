import { apiCall } from "../../services/api";
import { SET_NEW_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export const newUser = (user) => {
	return {
		type: SET_NEW_USER,
		user
	};
};

export const createUser = (type, userData) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return apiCall("post", "/users", userData)
				.then((user) => {
					dispatch(newUser(user));
					resolve();
				})
				.catch((err) => {
					dispatch(addError(err.message));
					reject();
				});
		});
	};
};
