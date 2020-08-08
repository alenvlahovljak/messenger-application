import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import Avatar from "../Avatar/Avatar";

const CurrentUserMessage = ({ text, timestamp }) => {
	timestamp = moment(timestamp).format("LT");
	return (
		<div className="messages-box-content current-user">
			<div className="messages-box-message current-user">
				<p className="messages-box-text">{text}</p>
				<span className="messages-box-time">{timestamp}</span>
			</div>
		</div>
	);
};

const OtherUserMessage = ({ text, timestamp }) => {
	timestamp = moment(timestamp).format("LT");
	return (
		<div className="messages-box-content">
			<Avatar />
			<div className="messages-box-message">
				<p className="messages-box-text">{text}</p>
				<span className="messages-box-time">{timestamp}</span>
			</div>
		</div>
	);
};

class Messages extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { user, messages } = this.props;
		const allMessages = messages.map(({ text, from, timestamp }) =>
			from.username == user.username ? (
				<CurrentUserMessage key={timestamp} text={text} timestamp={timestamp} />
			) : (
				<OtherUserMessage key={timestamp} text={text} timestamp={timestamp} />
			)
		);
		return allMessages;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
		messages: state.messages
	};
};

export default connect(mapStateToProps)(Messages);
