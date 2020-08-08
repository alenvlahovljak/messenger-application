import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import Messages from "../Messages/Messages";

import "./MessagesBox.css";

class MessagesBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	onEnterPress = (e) => {
		const { message } = this.state;
		const { match, sendMessageToGlobalRoom, user } = this.props;
		console.log("STREAMING");
		if (e.keyCode == 13 && e.shiftKey == false && message.trim().length > 0) {
			e.preventDefault();
			sendMessageToGlobalRoom({
				text: message.trim(),
				to: match.params.room_id,
				from: user,
				timestamp: Date.now()
			});
			this.setState({ message: "" });
		}
	};

	render() {
		return (
			<div className="messages-box">
				<Messages />
				<div className="messages-box-input">
					<form ref={(f) => (this.formRef = f)}>
						<textarea
							onKeyDown={this.onEnterPress}
							onChange={(e) => this.setState({ message: e.target.value })}
							value={this.state.message}
						/>
					</form>
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

export default connect(mapStateToProps)(MessagesBox);
