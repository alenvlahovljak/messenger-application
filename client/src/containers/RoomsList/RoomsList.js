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

	lastMessage = (from, to) => {
		const { messages } = this.props;
		if (from == false)
			return messages.filter((message, i, messages) => message.to._id == to && messages.length - 1 == i)[0];
		return messages.filter(
			(message, i, messages) => message.from._id == from && message.to._id == to && messages.length - 1 == i
		)[0];
	};

	render() {
		const { history, joinGlobalRoom, user, rooms } = this.props;
		return (
			<div className="rooms-list">
				<GlobalRoom
					history={history}
					joinGlobalRoom={joinGlobalRoom}
					lastSendMessage={this.lastMessage(user._id, "global")}
					lastRecivedMessage={this.lastMessage(false, "global")}
				/>
				{rooms.map(
					({ from, to }) =>
						from._id == user._id && (
							<Room
								key={to._id}
								history={history}
								from={from}
								to={to}
								sendMessage={this.lastMessage(from._id, to._id)}
								recivedMessage={this.lastMessage(to._id, from._id)}
							/>
						)
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
		messages: state.messages,
		rooms: state.rooms.rooms
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage })(RoomsList);
