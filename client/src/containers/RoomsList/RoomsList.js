import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { addError, removeError, addInfoMessage, removeInfoMessage } from "../../store/actions";

import Room from "../Room/Room";
import GlobalRoom from "../GlobalRoom/GlobalRoom";

import "./RoomsList.css";

class RoomsList extends Component {
	constructor(props) {
		super(props);
	}

	joinGlobalRoom = () => {
		const { user, history, addError, removeError, addInfoMessage, removeInfoMessage } = this.props;
		const socket = io.connect();
		socket.emit("joinRoom", user, (err) => {
			if (err?.length > 0) {
				removeInfoMessage();
				addError(err);
			}
			removeError();
		});
		history.push("/rooms/global");
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
		return (
			<div className="rooms-list">
				<GlobalRoom joinGlobalRoom={this.joinGlobalRoom} />
				<Room />
				<Room />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage })(RoomsList);
