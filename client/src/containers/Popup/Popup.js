import React, { Component } from "react";
import { connect } from "react-redux";

import { removeError, removeInfoMessage } from "../../store/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./Popup.css";

class Popup extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = () => {
		const { removeError, removeInfoMessage } = this.props;
		if (removeError) removeError();
		if (removeInfoMessage) removeInfoMessage();
	};

	setClassName = () => {
		const { error, info } = this.props;
		if (error) return "popup-message-box error";
		if (info) return "popup-message-box success";
	};

	setVisibility = () => {
		const { error, info } = this.props;
		const obj = { display: "none" };
		if (error) obj.display = "block";
		if (info) obj.display = "block";
		return obj;
	};

	render() {
		const { error, info } = this.props;
		const display = error || info;
		return (
			<div onClick={() => this.onClickHandler()} className={this.setClassName()} style={this.setVisibility()}>
				<FontAwesomeIcon className="popup-message-close" icon={faTimesCircle} />
				<span className="popup-message">{display}</span>
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
