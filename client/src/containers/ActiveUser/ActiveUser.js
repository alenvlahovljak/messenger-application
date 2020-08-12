import React, { Component } from "react";
import { connect } from "react-redux";

import { BASE_URL } from "../../config/api";

import { createRoom, setCurrentRoom } from "../../store/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../Avatar/Avatar";

import "./ActiveUser.css";

class ActiveUser extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = () => {
		const { history, createRoom, setCurrentRoom, currentUser, activeUser } = this.props;
		createRoom(false, { from: currentUser, to: activeUser });
		setCurrentRoom(activeUser);
		history.push(`/rooms/${currentUser._id}`);
	};

	render() {
		const { username, avatar } = this.props.activeUser;
		return (
			<div onClick={() => this.onClickHandler()} className="active-user">
				<Avatar src={avatar?.path && `${BASE_URL}/static/${avatar.path}?${Date.now()}`} />
				<div className="active-user-info">
					<span className="active-user-nick">{username}</span>
					<span className="active-user-activity">
						<FontAwesomeIcon icon={faClock} />
						&nbsp;&nbsp;&nbsp; online
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.users.currentUser
	};
};

export default connect(mapStateToProps, { createRoom, setCurrentRoom })(ActiveUser);
