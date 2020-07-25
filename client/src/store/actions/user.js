import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import * as actionTypes from "../actionTypes";

export const handleCreateUser = (user) => {
	return {
		type: actionTypes.SET_NEW_USER,
		user
	};
};

export const createUser = (data) => {
	console.log(data);
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return apiCall("POST", "/users", data)
				.then((user) => {
					dispatch(handleCreateUser(user));
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
