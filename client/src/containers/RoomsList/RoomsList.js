import React, { Component } from "react";

import Room from "../Room/Room";

import "./RoomsList.css";

class RoomsList extends Component {
	render() {
		return (
			<div className="rooms-list">
				<Room />
				<Room />
				<Room />
			</div>
		);
	}
}

export default RoomsList;
