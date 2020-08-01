import { combineReducers } from "redux";
import errors from "./errors";
import users from "./user";
import infoMessages from "./infoMessages";

const rootReducer = combineReducers({
	errors,
	infoMessages,
	users
});

export default rootReducer;
