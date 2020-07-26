import React, { Component } from "react";

import { ActiveUser } from "../../components/UI";

import "./MessengerRoom.css";

class MessengerRoom extends Component {
	render() {
		return (
			<div className="messenger-room">
				<ActiveUser />
			</div>
		);
	}
}

export default MessengerRoom;
