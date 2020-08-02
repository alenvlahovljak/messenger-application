import React, { Component } from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { addError, removeError, addInfoMessage, removeInfoMessage } from "../../store/actions";
import RoomsList from "../RoomsList/RoomsList";
import ActiveUsersList from "../ActiveUsersList/ActiveUsersList";
import MessagesBox from "../MessagesBox/MessagesBox";
import NavBar from "../NavBar/NavBar";

import { UserInfo, InfoMessageBox } from "../../components/UI";
import ErrorMessageBox from "../ErrorMesageBox/ErrorMessageBox";
import Popup from "../Popup/Popup";

import "./Messenger.css";

class Messenger extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = async () => {
		const socket = io.connect();
		const { addError, user, removeError, addInfoMessage, removeInfoMessage } = this.props;
		socket.on("connect", () => {
			socket.emit("join", user, (err) => {
				if (err?.length > 0) {
					removeInfoMessage();
					return addError(err);
				}
				removeError();
			});
		});
		socket.on("newUser", (msg) => {
			removeError();
			addInfoMessage(msg);
		});
		socket.on("disconnectedUser", (msg) => {
			removeError();
			addInfoMessage(msg);
		});
	};

	render() {
		const { error, infoMsg } = this.props;
		return (
			<main className="main">
				<Popup />
				<div className="messenger-box">
					<UserInfo {...this.props} />
					<Route exact path="/active-users" render={(props) => <ActiveUsersList {...props} />} />
					<Route exact path="/rooms" render={(props) => <RoomsList {...props} />} />
					<Route exact path="/rooms/:room_id" render={(props) => <MessagesBox {...props} />} />
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
		user: state.users.user
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage })(Messenger);
