import React, { Component } from "react";
import { connect } from "react-redux";

import { createRoom } from "../../store/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../components/UI";

import "./ActiveUser.css";

import defaultAvatar from "../../public/images/default-avatar.png";

class ActiveUser extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = async () => {
		const { history, createRoom, currentUser, user } = this.props;
		createRoom(false, { from: currentUser, to: user });
		history.push(`/rooms/${user._id}`);
	};

	render() {
		const { username, avatar } = this.props.user;
		return (
			<div onClick={() => this.onClickHandler()} className="active-user">
				<Avatar
					src={avatar?.path ? `http://localhost:8000/messenger/${avatar.path}?${Date.now()}` : defaultAvatar}
				/>
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

export default connect(mapStateToProps, { createRoom })(ActiveUser);
