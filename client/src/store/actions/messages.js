import * as actionTypes from "../actionTypes";
import { addError } from "./errors";
import { removeInfoMessage } from "./infoMessages";

export const handleNewMessage = (message) => {
	return {
		type: actionTypes.NEW_MESSAGE,
		message
	};
};

export const newMessage = (save, data) => {
	return async (dispatch) => {
		try {
			if (!save) {
				dispatch(handleNewMessage(data));
			}
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response));
		}
	};
};
