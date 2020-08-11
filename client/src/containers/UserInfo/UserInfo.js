import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import { addError, removeError, addInfoMessage, removeInfoMessage, setCurrentRoom } from "../../store/actions";

import { Avatar } from "../../components/UI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import "./UserInfo.css";

class UserInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { user, room, history, match } = this.props;
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
					src={room.avatar && `http://localhost:8000/messenger/${room.avatar.path}?${Date.now()}`}
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
