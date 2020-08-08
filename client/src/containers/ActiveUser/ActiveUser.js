import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { setCurrentRoom } from "../../store/actions";

import { Avatar } from "../../components/UI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import "./ActiveUser.css";

import defaultAvatar from "../../public/images/default-avatar.png";

class ActiveUser extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = async () => {
		const { history, setCurrentRoom, _id, username, avatar } = this.props;
		setCurrentRoom({ _id, username, avatar });
		history.push(`/rooms/${_id}`);
	};

	render() {
		const { username, avatar, status, updatedAt } = this.props;
		return (
			<div onClick={() => this.onClickHandler()} className="active-user">
				<Avatar
					src={avatar?.path ? `http://localhost:8000/messenger/${avatar.path}?${Date.now()}` : defaultAvatar}
				/>
				<div className="active-user-info">
					<span className="active-user-nick">{username}</span>
					<span className="active-user-activity">
						<FontAwesomeIcon icon={faClock} />
						&nbsp;&nbsp;&nbsp;
						{status == "online" ? status : moment(updatedAt).startOf("hour").fromNow()}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser
	};
};

export default connect(mapStateToProps, { setCurrentRoom })(ActiveUser);
