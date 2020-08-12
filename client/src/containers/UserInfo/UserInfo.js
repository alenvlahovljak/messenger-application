import React, { Component } from "react";
import { connect } from "react-redux";

import { BASE_URL } from "../../config/api";

import { addError, removeError, addInfoMessage, removeInfoMessage, setCurrentRoom } from "../../store/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../Avatar/Avatar";

import "./UserInfo.css";

class UserInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { history, match, user, room } = this.props;
		return (
			<header className="user-info">
				{match.params.id_2 && (
					<span
						className="user-backward"
						onClick={() => {
							history.goBack();
							this.props.setCurrentRoom(user);
						}}
					>
						<FontAwesomeIcon icon={faBackward} />
					</span>
				)}

				{room._id ? (
					<span className="user-username">{room.username}</span>
				) : (
					<span className="user-username">Unknow</span>
				)}

				<Avatar
					upload
					src={
						user._id == room._id
							? user.avatar?.path && `${BASE_URL}/static/${user.avatar.path}?${Date.now()}`
							: room.avatar?.path && `${BASE_URL}/static/${room.avatar.path}?${Date.now()}`
					}
					alt={room.username}
				/>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
		room: state.rooms.currentRoom
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage, setCurrentRoom })(
	UserInfo
);
