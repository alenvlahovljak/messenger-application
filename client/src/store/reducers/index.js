import { combineReducers } from "redux";
import errors from "./errors";
import users from "./users";
import messages from "./messages";
import infoMessages from "./infoMessages";
import rooms from "./rooms";

const rootReducer = combineReducers({
	errors,
	infoMessages,
	users,
	messages,
	rooms
});

export default rootReducer;
