import React, { Component } from "react";

import { BASE_URL } from "../../config/api";

import io from "socket.io-client";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
	setUserSocketId,
	createRoom,
	addActiveUser,
	removeActiveUser,
	newMessage,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
} from "../../store/actions";
import RoomsList from "../RoomsList/RoomsList";
import ActiveUsersList from "../ActiveUsersList/ActiveUsersList";
import MessagesBox from "../MessagesBox/MessagesBox";
import NavBar from "../NavBar/NavBar";

import UserInfo from "../UserInfo/UserInfo";
import Popup from "../Popup/Popup";

import "./Messenger.css";

class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: io(BASE_URL)
		};
	}

	componentDidMount = () => {
		const { socket } = this.state;
		const { setUserSocketId, newMessage, addInfoMessage, user, addActiveUser, removeActiveUser } = this.props;

		socket.on("connect", () => {
			setUserSocketId({ ...user, socketId: socket.id });
			socket.emit("addUser", { ...user, status: "online", socketId: socket.id }, (err) => {
				if (err?.length > 0) {
					removeInfoMessage();
					return addError(err);
				}
				removeError();
			});
		});

		socket.on("removeUser", (socketId) => {
			removeActiveUser(socketId);
		});

		socket.on("user", (user) => {
			addActiveUser(user);
		});

		socket.on("info", (msg) => {
			addInfoMessage(msg);
		});

		socket.on("messageToRoom", (message) => {
			const { createRoom } = this.props;
			if (message.save) {
				newMessage(true, message);
			} else {
				createRoom(false, { to: message.from, from: message.to });
				newMessage(false, message);
			}
		});
	};

	joinGlobalRoom = () => {
		const { socket } = this.state;
		const { history, user } = this.props;
		socket.emit("joinGlobalRoom", user, (err) => {
			if (err?.length > 0) {
				removeInfoMessage();
				return addError(err);
			}
		});
		history.push("/rooms/global");
	};

	sendMessage = (message) => {
		const { socket } = this.state;
		socket.emit("sendMessage", message, (err) => {
			if (err?.length > 0) {
				removeInfoMessage();
				return addError(err);
			}
			removeError();
		});
	};

	componentWillUnmount = () => {
		const { socket } = this.state;
		socket.close();
	};

	render() {
		return (
			<main className="main">
				<Popup />
				<div className="messenger-box">
					<UserInfo {...this.props} />
					<Route exact path="/active-users" render={(props) => <ActiveUsersList {...props} />} />
					<Route
						exact
						path="/rooms"
						render={(props) => <RoomsList {...props} joinGlobalRoom={this.joinGlobalRoom} />}
					/>
					<Route
						exact
						path="/rooms/:room_id"
						render={(props) => <MessagesBox {...props} sendMessage={this.sendMessage} />}
					/>
					<NavBar />
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.errors.err,
		infoMsg: state.infoMessages.infoMsg,
		user: state.users.currentUser,
		messages: state.messages,
		room: state.rooms.currentRoom
	};
};

export default connect(mapStateToProps, {
	setUserSocketId,
	createRoom,
	addActiveUser,
	removeActiveUser,
	newMessage,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
})(Messenger);
