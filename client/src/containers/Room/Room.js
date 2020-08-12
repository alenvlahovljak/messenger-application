import React, { Component } from "react";
import { connect } from "react-redux";

import { BASE_URL } from "../../config/api";

import { createRoom, setCurrentRoom } from "../../store/actions";

import Avatar from "../Avatar/Avatar";

import "./Room.css";

class Room extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = () => {
		const { history, createRoom, setCurrentRoom, from, to } = this.props;
		createRoom(false, { from, to });
		setCurrentRoom(to);
		history.push(`/rooms/${from._id}`);
	};

	render() {
		const { to, sendMessage, recivedMessage } = this.props;
		return (
			<div onClick={() => this.onClickHandler()} className="room">
				<Avatar src={to.avatar?.path && `${BASE_URL}/static/${to.avatar.path}?${Date.now()}`} />
				<div className="room-info">
					<span className="room-nick">{to.username}</span>
					<span className="room-message">
						{sendMessage?.text ? `YOU: ${sendMessage.text}` : recivedMessage?.text}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
		messages: state.messages
	};
};

export default connect(mapStateToProps, { createRoom, setCurrentRoom })(Room);
