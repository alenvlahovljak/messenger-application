import { SET_NEW_ROOM } from "../actionTypes";

const DEFAULT_STATE = {
	room: {}
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_NEW_ROOM:
			return {
				room: action.room
			};
		default:
			return state;
	}
};
