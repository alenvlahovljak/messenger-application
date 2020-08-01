import { ADD_INFO_MESSAGE, REMOVE_INFO_MESSAGE } from "../actionTypes";

export const addInfoMessage = (infoMsg) => ({
	type: ADD_INFO_MESSAGE,
	infoMsg
});

export const removeInfoMessage = () => ({
	type: REMOVE_INFO_MESSAGE
});
