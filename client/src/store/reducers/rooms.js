import { SET_NEW_ROOM, SET_CURRENT_ROOM } from "../actionTypes";

const DEFAULT_STATE = {
	room: {},
	rooms: []
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_NEW_ROOM:
			return {
				rooms: [...state.rooms, action.room]
			};
		case SET_CURRENT_ROOM:
			return {
				room: action.room
			};
		default:
			return state;
	}
};
