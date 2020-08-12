import { CREATE_ROOM, SET_CURRENT_ROOM, LAST_MESSAGE_IN_ROOM } from "../actionTypes";

const DEFAULT_STATE = {
	currentRoom: {},
	rooms: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case CREATE_ROOM:
			const rooms = state.rooms.slice();
			const isDuplicate = rooms.some(
				(room) => room.from._id == action.room.from._id && room.to._id == action.room.to._id
			);
			if (!isDuplicate) {
				rooms.push({ ...action.room });
			}
			return {
				...state,
				rooms
			};
		case SET_CURRENT_ROOM:
			return {
				...state,
				currentRoom: action.room
			};
		default:
			return state;
	}
};
