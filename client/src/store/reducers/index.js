import { combineReducers } from "redux";
import errors from "./errors";
import users from "./user";

const rootReducer = combineReducers({
	errors,
	users
});

export default rootReducer;
