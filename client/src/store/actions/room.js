import { createRoomAPI } from "../../services/api";
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
		} catch (err) {}
	};
};
