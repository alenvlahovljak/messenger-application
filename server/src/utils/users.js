//require db
const db = require("../models");

//require constants
const { USER_STATUS } = require("../utils/constants");
const { use } = require("../routes/users");

//define User class
class Users {
	constructor() {
		this.users = [];
	}

	addUser = async (_id, status, socketId) => {
		return await db.User.findByIdAndUpdate(_id, { status, socketId }, { runValidators: true, new: true });
	};
	getUserBySocketId = async (id) => {
		return await db.User.findOne({ socketId: id });
	};
	getUserBySocketIdAndDisconnect = async (id) => {
		const user = await db.User.findOne({ socketId: id });
		user.status = "offline";
		await user.save();
		return user;
	};
	getUserListExpectCurrentUser = async (user) => {
		const users = await db.User.find({ _id: { $nin: [user._id] } });
		return users;
	};
}

//export User class
module.exports = { Users };
