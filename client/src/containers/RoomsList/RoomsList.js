import React, { Component } from "react";
import { connect } from "react-redux";

import Room from "../Room/Room";

import "./RoomsList.css";

class RoomsList extends Component {
	constructor(props) {
		super(props);
	}

	joinGlobalRoom = () => {
		const { user, history } = this.props;
		history.push("/rooms/global");
	};

	render() {
		return (
			<div className="rooms-list">
				<Room joinGlobalRoom={this.joinGlobalRoom} />
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

export default connect(mapStateToProps)(RoomsList);
