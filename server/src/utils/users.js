//require db
const db = require("../models");

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
		const user = await (await db.User.findOne({ socketId: id })).deleteOne();
		return user;
	};
	getUserListExpectCurrentUser = async (user) => {
		const users = await db.User.find({ _id: { $nin: [user._id] }, status: "online" });
		return users;
	};
}

//export User class
module.exports = { Users };
