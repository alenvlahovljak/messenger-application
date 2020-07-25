//require necessary modules
const mongoose = require("mongoose");

//define message Schema
const messageSchema = new mongoose.Schema(
	{
		content: String
	},
	{ timestamps: true }
);

//define mongoose Schema
const userSchema = new mongoose.Schema(
	{
		avatar: Object,
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			minlength: [3, "Username must containt at least 3 characters"],
			maxlength: [50, "Username cannot contain more than 50 characters"]
		},
		city: { type: String, default: "Unvailable" },
		messages: [messageSchema]
	},
	{ timestamps: true }
);

//define static method for JSON response
userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.updatedAt;
	delete user.__v;
	return user;
};

//define pre hook which for username change
userSchema.pre("save", async function (next) {
	if (!this.isModified("username")) return next();
	this.username = `${this.username}_${this._id}`;
	return next();
});

//define mongoose model
const User = mongoose.model("User", userSchema);

//export User model
module.exports = User;
