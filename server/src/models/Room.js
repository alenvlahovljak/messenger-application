//require necessary modules
const mongoose = require("mongoose");

//define mongoose Schema
const roomSchema = new mongoose.Schema(
	{
		currentUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message"
			}
		]
	},
	{ timestamps: true }
);

//define static method for JSON response
roomSchema.methods.toJSON = function () {
	const room = this.toObject();
	delete room.__v;
	return room;
};

//define mongoose model
const Room = mongoose.model("Room", roomSchema);

//export Room model
module.exports = Room;
