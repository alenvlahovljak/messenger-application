import { createRoomAPI } from "../../services/api";
import { addError, removeError } from "./errors";
import { removeInfoMessage } from "./infoMessages";
import * as actionTypes from "../actionTypes";

export const handleCreateRoom = (room) => {
	return {
		type: actionTypes.CREATE_ROOM,
		room
	};
};

export const createRoom = (save, data) => {
	return async (dispatch) => {
		try {
			if (save) {
				const room = await createRoomAPI("POST", "/rooms", data);
				dispatch(handleCreateRoom(room.data));
				dispatch(setCurrentRoom(room));
			} else {
				dispatch(handleCreateRoom(data));
				dispatch(setCurrentRoom(data.to));
			}
		} catch (err) {
			dispatch(removeInfoMessage());
			dispatch(addError(err.response));
		}
	};
};

export const setCurrentRoom = (room) => {
	return {
		type: actionTypes.SET_CURRENT_ROOM,
		room
	};
};
