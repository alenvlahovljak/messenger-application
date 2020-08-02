import React, { Component } from "react";
import { connect } from "react-redux";
import { removeError } from "../../store/actions/errors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./ErrorMessageBox.css";

class ErrorMessageBox extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = () => {
		const { removeError } = this.props;
		removeError();
	};

	render() {
		const { display, error } = this.props;
		return (
			<div onClick={() => this.onClickHandler()} className="error-message-box" style={{ display: `${display}` }}>
				<FontAwesomeIcon className="error-message-close" icon={faTimesCircle} />
				{error}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.errors.err
	};
};

export default connect(mapStateToProps, { removeError })(ErrorMessageBox);
