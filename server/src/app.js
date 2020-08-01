//require necessary modules
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

//require nexxessary constants
const { CORS, USER_STATUS } = require("./utils/constants");

//execute Express app
const app = express();
const server = http.createServer(app);

//configure socket.io
const io = socketIO(server);

//require user's helper functions
const { Users } = require("./utils/users");

//require error handler
const { errorHandler } = require("./controllers/errors");

//require routes
const { usersRoutes } = require("./routes");

//require database
const db = require("./models");
const { join } = require("path");

app.use(express.static(path.join(__dirname, "../public")));

//configure modules usage
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
	cors({
		credentials: true,
		origin: (origin, cb) => {
			/*if (CORS.WHITE_LIST.includes(origin)) */ return cb(null, true);
			cb(new Error("Not allowed by CORS!"));
		}
	})
);
//app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure static files serving
app.use("/messenger/avatars", express.static(path.join(__dirname, "../public/storage/avatars")));

//use routes
app.use("/users", usersRoutes);

//configure sockets
io.on("connection", (socket) => {
	const usersIO = new Users();
	console.log("New user connected!");

	//new user join chat application
	socket.on("join", async (user, cb) => {
		try {
			if (user._id == undefined) {
				return cb("Cannot obtain user, please refresh your browser!");
			}
			await usersIO.addUser(user._id, USER_STATUS.ONLINE, socket.id);
			socket.emit("newUser", `Welcome ${user.username}!`);
			socket.broadcast.emit("newUser", `${user.username} has joined the chat!`);
			cb();
		} catch (err) {
			cb(err);
		}
	});

	//get all users expect current user
	socket.on("allUsersExpectCurrent", async (user, cb) => {
		try {
			if (user._id == undefined) {
				return cb("Cannot obtain user, please refresh your browser!");
			}
			const users = await usersIO.getUserListExpectCurrentUser(user);
			cb(users);
		} catch (err) {
			cb(err);
		}
	});

	//join room
	socket.on("joinRoom", (user, cb) => {
		try {
			if (user._id == undefined) {
				return cb("Cannot obtain user, please refresh your browser!");
			}
			socket.join("global");
			socket.emit("newUser", `Welcome ${user.username} to Global Room!`);
			socket.to("global").emit("newUser", `${user.username} has joined the Global Room!`);
			cb();
		} catch (err) {
			cb(err);
		}
	});

	//disconnect from room
	socket.on("leaveRoom", async (obj, cb) => {
		try {
			if (obj.user._id == undefined) {
				return cb("Cannot obtain user, please refresh your browser!");
			}
			socket.to(obj.room).emit("disconnectedUser", `${obj.user.username} disconected ${obj.room} room!`);
		} catch (err) {
			cb(err);
		}
	});

	//user disconnect from application
	socket.on("disconnect", async () => {
		const user = await usersIO.getUserBySocketIdAndDisconnect(socket.id);
		socket.broadcast.emit("disconnectedUser", `${user.username} disconnected!`);
		console.log(`${user.username} disconnected!`);
	});
});

//catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error("Page Not Found!");
	err.status = 404;
	next(err);
});

//use error handler
app.use(errorHandler);

//export express app
module.exports = server;
