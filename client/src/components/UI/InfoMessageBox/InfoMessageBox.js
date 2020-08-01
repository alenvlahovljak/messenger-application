import React from "react";
import { connect } from "react-redux";

import "./InfoMessageBox.css";

const InfoMessageBox = ({ display, infoMsg }) => {
	return (
		<div className="info-message-box" style={{ display: `${display}` }}>
			{infoMsg}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		infoMsg: state.infoMessages.infoMsg
	};
};

export default connect(mapStateToProps)(InfoMessageBox);
