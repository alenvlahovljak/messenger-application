import React, { Component } from "react";
import { connect } from "react-redux";
import { animateScroll } from "react-scroll";
import TextareaAutosize from "react-textarea-autosize";

import Messages from "../Messages/Messages";

import "./MessagesBox.css";

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

const OtherUserMessage = ({ from, to, text, timestamp }) => {
	timestamp = moment(timestamp).format("LT");
	return (
		<div className="messages-box-content">
			<Avatar />
			<div className="message-box-info">
				{to._id == "global" && <span className="messages-box-username">{from.username}</span>}
				<div className="messages-box-message">
					<p className="messages-box-text">{text}</p>
					<span className="messages-box-time">{timestamp}</span>
				</div>
			</div>
		</div>
	);
};

class MessagesBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			disabled: false
		};
	}

	componentDidMount = () => {
		this.scrollToBottom();
	};

	componentDidUpdate = (prevProps) => {
		const { disabled } = this.state;
		const { messages } = this.props;
		if (prevProps.messages.length != messages.length) {
			this.scrollToBottom();
			this.setState({ disabled: false }, () => {
				this.formRef.childNodes[0].focus();
			});
		}
	};

	onEnterPress = (e) => {
		const { message, disabled } = this.state;
		const { match, sendMessage, user, room } = this.props;
		if (e.keyCode == 13 && e.shiftKey == false && message.trim().length > 0) {
			e.preventDefault();
			sendMessage({
				save: match.params.room_id == "global" ? true : false,
				text: message.trim(),
				to: match.params.room_id == "global" ? { _id: "global" } : room,
				from: user,
				timestamp: Date.now()
			});
			this.setState({ message: "", disabled: true });
		}
	};

	scrollToBottom = () => {
		animateScroll.scrollToBottom({
			duration: 500,
			delay: 100,
			smooth: true,
			containerId: "messages"
		});
	};

	render() {
		const { disabled } = this.state;
		const { match, user, messages } = this.props;
		return (
			<div className="messages-box">
				<div id="messages" ref={(scroll) => (this.toBottom = scroll)} className="messages-box-chat">
					{messages.map(({ text, from, to, timestamp }) => {
						console.log("MATCH", match.params.room_id, to._id);

						return from.username == user.username ? (
							<CurrentUserMessage key={timestamp} text={text} timestamp={timestamp} />
						) : (
							<OtherUserMessage key={timestamp} text={text} timestamp={timestamp} from={from} to={to} />
						);
					})}
				</div>
				<div className="messages-box-input">
					<form ref={(f) => (this.formRef = f)}>
						<TextareaAutosize
							placeholder={"Type your message"}
							maxRows={3}
							className="messages-box-textarea"
							autoFocus
							disabled={disabled}
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
		messages: state.messages,
		room: state.rooms.currentRoom
	};
};

export default connect(mapStateToProps)(MessagesBox);
