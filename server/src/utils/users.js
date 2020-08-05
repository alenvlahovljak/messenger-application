//require db
const db = require("../models");

//define User class
class Users {
	constructor() {
		this.users = [];
	}

	addUser = async (_id, status, socketId) => {
		try {
			return await db.User.findByIdAndUpdate(_id, { status, socketId }, { runValidators: true, new: true });
		} catch (err) {
			return "Unable to find user!";
		}
	};

	getUserBySocketId = async (id) => {
		try {
			return await db.User.findOne({ socketId: id });
		} catch (err) {
			return "Unable to find user!";
		}
	};

	getUserListExpectCurrentUser = async (user) => {
		try {
			return await db.User.find({ _id: { $nin: [user._id] }, status: "online" });
		} catch (err) {
			return [];
		}
	};

	getUserBySocketIdAndDisconnect = async (id) => {
		try {
			const user = await db.User.findOne({ socketId: id });
			await user.deleteOne();
			return user;
		} catch (err) {
			return "Unable to find and delete user!";
		}
	};
}

//export User class
module.exports = { Users };
