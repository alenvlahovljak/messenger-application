//require necessary module
const path = require("path");
const fs = require("fs");

//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define users' create controller
const createUser = async (req, res, next) => {
	try {
		const { location } = req.body;
		const user = await db.User.create({
			username: "User",
			location
		});
		return res.status(201).json(user);
	} catch (err) {
		if (err.code == 11000) err.message = "Username is already taken!";
		if (err.code == undefined) {
			err.status = 400;
			err.message = databaseErrorHandler(err);
		}
		next(err);
	}
};

//exports users' controllers
module.exports = { createUser };
