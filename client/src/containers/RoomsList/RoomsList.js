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

	render() {
		const { joinGlobalRoom, joinRoom, rooms, messages } = this.props;
		const lastMessage = messages.filter(
			(message, i, messages) => message.to == "global" && i == messages.length - 1 && message
		)[0];
		return (
			<div className="rooms-list">
				<GlobalRoom lastMessage={lastMessage} joinGlobalRoom={joinGlobalRoom} />
				{rooms.map((room) => (
					<Room key={room.to._id} room={room} />
				))}
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
