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
		const { joinGlobalRoom } = this.props;
		return (
			<div className="rooms-list">
				<GlobalRoom joinGlobalRoom={joinGlobalRoom} />
				<Room />
				<Room />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage })(RoomsList);
