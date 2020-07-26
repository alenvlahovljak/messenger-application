import React, { Component } from "react";
import { connect } from "react-redux";

import MessengerRoom from "../MessengerRoom/MessengerRoom";
import NavBar from "../NavBar/NavBar";

import { UserInfo, ErrorMessageBox } from "../../components/UI";

import "./Messenger.css";

class Messenger extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { error } = this.props;
		return (
			<main className="main">
				<ErrorMessageBox display={error ? "block" : "none"} height="3" width="10" />
				<div className="messenger-box">
					<UserInfo />
					<MessengerRoom />
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
