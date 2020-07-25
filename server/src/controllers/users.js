//require necessary module
const axios = require("axios");

//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define users' create controller
const createUser = async (req, res, next) => {
	try {
		const { location } = req.body;
		console.log("CI", r.data.city);
		if (location) {
			//const geolocation = await axios.get(`https://geocode.xyz/${location.latitude},${location.longitude}?json=1`);
		}
		const user = await db.User.create({
			username: "User",
			location: geolocation.data.city
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
