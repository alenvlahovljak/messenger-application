import React, { Component } from "react";

import io from "socket.io-client";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
	setUserSocketId,
	getAllUsersExpectCurrent,
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

import { UserInfo } from "../../components/UI";
import Popup from "../Popup/Popup";

import "./Messenger.css";
import messages from "../../store/reducers/messages";

class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: io("http://localhost:8000")
		};
	}

	componentDidMount = () => {
		const { match, setUserSocketId, newMessage, addInfoMessage, user } = this.props;
		const { socket } = this.state;

		socket.on("connect", () => {
			console.log(socket.connected); // true
			setUserSocketId({ ...user, socketId: socket.id });
		});

		socket.on("info", (msg) => {
			addInfoMessage(msg);
		});

		socket.on("messageToRoom", (message) => {
			newMessage(false, message);
		});
	};

	joinGlobalRoom = () => {
		const { socket } = this.state;
		this.setState({ isSent: false });
		const { history, user } = this.props;
		socket.emit("joinGlobalRoom", user, (err) => {
			if (err?.length > 0) {
				removeInfoMessage();
				return addError(err);
			}
		});
		history.push("/rooms/global");
	};

	leaveGlobalRoom = () => {};

	sendMessageToGlobalRoom = (message) => {
		const { socket } = this.state;
		socket.emit("sendMessageToGlobalRoom", message, (err) => {
			if (err?.length > 0) {
				removeInfoMessage();
				return addError(err);
			}
			removeError();
		});
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
						render={(props) => <MessagesBox {...props} sendMessageToGlobalRoom={this.sendMessageToGlobalRoom} />}
					/>
					{/*Add for other routes */}
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
		messages: state.messages
	};
};

export default connect(mapStateToProps, {
	setUserSocketId,
	getAllUsersExpectCurrent,
	newMessage,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
})(Messenger);
