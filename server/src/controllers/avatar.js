//require necessary module
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

//require db
const db = require("../models");

//define create avatar handler
const createAvatar = async (req, res, next) => {
	try {
		const { filename, path: avatarPath, destination } = req.file;
		const user = await db.User.findById(Object.values(req.params)[0]);
		if (!user) {
			return res.status(404).json({
				status: res.statusCode,
				messages: "User not found!"
			});
		}
		await sharp(avatarPath)
			.resize({ width: 50, height: 50 })
			.jpeg({ quality: 70 })
			.toFile(path.resolve(destination, "../avatars", filename));
		fs.unlinkSync(avatarPath);
		user.avatar = {
			filename,
			path: `avatars/${filename}`
		};
		await user.save();
		return res.status(201).json(user);
	} catch (err) {
		return next({
			status: 400,
			messages: err.messages
		});
	}
};

//define delete avatar handler
const deleteAvatar = async (req, res, next) => {
	try {
		const user = await db.User.findById(Object.values(req.params)[0]);
		if (user.avatar) {
			await fs.unlink(path.join(__dirname, "../../public/storage", user.avatar.path), (err) => {});
		}
		user.avatar = undefined;
		await user.save();
		return res.status(204).send();
	} catch (err) {
		return next(err);
	}
};

//export avatar handlers
module.exports = { createAvatar, deleteAvatar };
