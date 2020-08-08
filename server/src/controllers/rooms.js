//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define room's create controller
const createRoom = async (req, res, next) => {
	try {
		const { currentUser, participants } = req.body;
		console.log("sds", participants);
		const data = await db.Room.create({ currentUser, participants: [...participants] });
		const room = await db.Room.findById(data._id).populate("participants");
		return res.status(201).json(room);
	} catch (err) {
		if (err.code == undefined) {
			err.status = 400;
			err.message = databaseErrorHandler(err);
		}
		next(err);
	}
};

//export rooms' controllers
module.exports = { createRoom };
