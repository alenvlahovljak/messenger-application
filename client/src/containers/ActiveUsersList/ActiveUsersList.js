import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getAllUsersExpectCurrent,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
} from "../../store/actions";

import ActiveUser from "../ActiveUser/ActiveUser";

import "./ActiveUsersList.css";

class ActiveUsersList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { users = [] } = this.props;
		//const activeUsers = users.map((user) => <ActiveUser />);
		return (
			<div className="active-users-list">
				<ActiveUser />
				<ActiveUser />
				<ActiveUser />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user,
		users: state.users.users
	};
};

export default connect(mapStateToProps, {
	getAllUsersExpectCurrent,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
})(ActiveUsersList);
