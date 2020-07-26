import React, { Component } from "react";

import ActiveUser from "../ActiveUser/ActiveUser";

import "./ActiveUsersList.css";

class ActiveUsersList extends Component {
	render() {
		return (
			<div className="active-users-list">
				<ActiveUser />
				<ActiveUser />
				<ActiveUser />
			</div>
		);
	}
}

export default ActiveUsersList;
