import React from "react";
import { connect } from "react-redux";

import "./ErrorMessageBox.css";

const ErrorMessageBox = ({ display, error }) => {
	return (
		<div className="error-message-box" style={{ display: `${display}` }}>
			{error}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.errors.err
	};
};

export default connect(mapStateToProps)(ErrorMessageBox);
