import { createRoomAPI } from "../../services/api";
import { addError, removeError } from "./errors";
import { removeInfoMessage } from "./infoMessages";
import * as actionTypes from "../actionTypes";

export const handleCreateRoom = (room) => {
	return {
		type: actionTypes.SET_NEW_ROOM,
		room
	};
};

export const createRoom = (data) => {
	return async (dispatch) => {
		try {
			const room = await createRoomAPI("POST", "/rooms", data);
			dispatch(removeInfoMessage());
			dispatch(removeError());
			dispatch(handleCreateRoom(room.data));
			return room;
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
