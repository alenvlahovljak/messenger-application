import React, { Component } from "react";
import { connect } from "react-redux";

import { removeError, removeInfoMessage } from "../../store/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./Popup.css";

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = { fadeOut: false };
	}

	onClickHandler = () => {
		this.setState({ fadeOut: true });
	};

	onAnimationEndHandler = () => {
		const { fadeOut } = this.state;
		const { removeError, removeInfoMessage } = this.props;
		if (fadeOut) {
			if (removeError) removeError();
			if (removeInfoMessage) removeInfoMessage();
			this.setState({ fadeOut: false });
		}
	};

	setClassName = () => {
		const { fadeOut } = this.state;
		const { error, info } = this.props;
		const className = ["popup-message-box"];
		if (error) className.push("error");
		if (info) className.push("success");
		if (fadeOut) className.push("fade-out");
		return className.join(" ");
	};

	setVisibility = () => {
		const { error, info } = this.props;
		const obj = { display: "none" };
		if (error) obj.display = "flex";
		if (info) obj.display = "flex";
		return obj;
	};

	setMessage = () => {
		const { error, info } = this.props;
		return error || info;
	};

	render() {
		return (
			<div
				onAnimationEnd={() => this.onAnimationEndHandler()}
				onClick={() => this.onClickHandler()}
				className={this.setClassName()}
				style={this.setVisibility()}
			>
				<span className="popup-message">{this.setMessage()}</span>
				<FontAwesomeIcon className="popup-message-close" icon={faTimesCircle} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.errors.err,
		info: state.infoMessages.infoMsg
	};
};

export default connect(mapStateToProps, { removeError, removeInfoMessage })(Popup);
