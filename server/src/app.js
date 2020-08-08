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
const { usersRoutes, roomsRoutes } = require("./routes");

//require database
const db = require("./models");
const user = require("./middleware/user");
const users = require("./utils/users");

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
app.use("/rooms", roomsRoutes);

io.on("connect", (socket) => {
	console.log("New socket connected!");

	socket.on("joinGlobalRoom", (user, cb) => {
		try {
			socket.join("global");
			socket.emit("info", "Welcome to global room!");
			socket.broadcast.to("global").emit("info", `${user.username} has joined global room!`);
			cb();
		} catch (err) {
			cb("Unable to join global room!");
		}
	});

	socket.on("sendMessageToGlobalRoom", (message, cb) => {
		try {
			io.to("global").emit("messageToRoom", message);
			cb();
		} catch (err) {
			cb("Unable to send message!");
		}
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
