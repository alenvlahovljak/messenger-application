import React, { Component } from "react";

import "./MessagesBox.css";

import Avatar from "../Avatar/Avatar";

class MessagesBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	onEnterPress = (e) => {
		console.log("STREAMING");
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			console.log("ENTER pressed!");
			this.setState({ message: "" });
		}
	};

	render() {
		return (
			<div className="messages-box">
				<div className="messages-box-content">
					<Avatar />
					<div className="messages-box-message">
						<p className="messages-box-text">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
							and scrambled it to make a type specimen book. It has survived not only five centuries, but also
							the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
							1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</p>
						<span className="messages-box-time">17:35</span>
					</div>
				</div>
				<div className="messages-box-content current-user">
					<div className="messages-box-message current-user">
						<p className="messages-box-text">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
							and scrambled it to make a type specimen book. It has survived not only five centuries, but also
							the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
							1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</p>
						<span className="messages-box-time">17:35</span>
					</div>
				</div>
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

export default MessagesBox;
