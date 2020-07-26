//require necessary modules
const express = require("express");

//configure express Router
const router = express.Router({ mergeParams: true });

//require error handler
const { uploadErrorHandler } = require("../controllers/errors");

//require utils
const { avatar } = require("../utils/index");

//require users' controllers
const { createUser } = require("../controllers/users");

//require users' avatar controllers
const { createAvatar, deleteAvatar } = require("../controllers/avatar");

//define users' routes
router.route("/").post(createUser);

//define user's avatar routes
router.post("/:user_id/avatar", avatar.single("avatar"), createAvatar, uploadErrorHandler);
router.route("/:user_id/avatar").delete(deleteAvatar);

//export users' routes
module.exports = router;
