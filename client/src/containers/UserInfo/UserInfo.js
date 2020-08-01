import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

import { Avatar } from "../../components/UI";

import "./UserInfo.css";

import defaultAvatar from "../../public/images/default-avatar.png";

class UserInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { user, history } = this.props;
		return (
			<header className="user-info">
				<span className="user-backward" onClick={() => history.goBack()}>
					<FontAwesomeIcon icon={faBackward} />
				</span>

				{user._id ? (
					<span className="user-username">{user.username}</span>
				) : (
					<span className="user-username">Unknow</span>
				)}

				<Avatar
					upload
					src={user.avatar ? `http://localhost:8000/messenger/${user.avatar.path}?${Date.now()}` : defaultAvatar}
					alt={`${user.username}'s avatar`}
					size="4"
				/>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user
	};
};

export default connect(mapStateToProps)(UserInfo);
