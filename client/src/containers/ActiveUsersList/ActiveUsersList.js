import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
	getAllUsersExpectCurrent,
	addError,
	removeError,
	addInfoMessage,
	removeInfoMessage
} from "../../store/actions";

import ActiveUser from "../ActiveUser/ActiveUser";
import { Loader } from "../../components/Animations";

import "./ActiveUsersList.css";

class ActiveUsersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: this.props.users
		};
	}

	render() {
		const { users = [] } = this.state;
		const activeUsersList = users.map((user) => (
			<ActiveUser
				{...this.props}
				key={user._id}
				_id={user._id}
				avatar={user.avatar ? user.avatar : undefined}
				username={user.username}
				status={user.status}
				updatedAt={user.updatedAt}
			/>
		));
		return <div className="active-users-list">{activeUsersList.length == 0 ? <Loader /> : activeUsersList}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
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
