import * as actionTypes from "../actionTypes";

import { createMessageAPI, indexMessagesAPI } from "../../services/api";

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
			const user = await createMessageAPI("POST", "/messages", data);
			dispatch(handleNewMessage(user.data));
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response.data.message));
		}
	};
};

export const handleLoadMessages = (messages) => {
	return {
		type: actionTypes.LOAD_MESSAGES,
		messages
	};
};

export const loadMessages = () => {
	return async (dispatch) => {
		try {
			const messages = await indexMessagesAPI("GET", "/messages");
			dispatch(handleLoadMessages(messages.data));
		} catch (err) {
			const { data } = err.response;
			dispatch(removeInfoMessage());
			dispatch(addError(data.message));
		}
	};
};
