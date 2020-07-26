import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import RoomsList from "../RoomsList/RoomsList";
import ActiveUsersList from "../ActiveUsersList/ActiveUsersList";
import NavBar from "../NavBar/NavBar";

import { UserInfo, ErrorMessageBox } from "../../components/UI";

import "./Messenger.css";

class Messenger extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { error, location } = this.props;
		return (
			<main className="main">
				<ErrorMessageBox display={error ? "block" : "none"} height="3" width="10" />
				<div className="messenger-box">
					<UserInfo />
					{location.pathname == "/messenger/active-users" && <ActiveUsersList />}
					{location.pathname == "/messenger/rooms" && <RoomsList />}
					<NavBar />
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.errors.err
	};
};

export default connect(mapStateToProps)(Messenger);
