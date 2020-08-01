import React from "react";
import moment from "moment";

import { Avatar } from "../../components/UI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlobe } from "@fortawesome/free-solid-svg-icons";

import "./ActiveUser.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const ActiveUser = ({ history, _id, username, avatar, status, updatedAt }) => {
	return (
		<div onClick={() => history.push(`/rooms/${_id}`)} className="active-user">
			<Avatar
				src={avatar?.path ? `http://localhost:8000/messenger/${avatar.path}?${Date.now()}` : defaultAvatar}
				size="6"
			/>
			<div className="active-user-info">
				<span className="active-user-nick">{username}</span>
				<span className="active-user-activity">
					<FontAwesomeIcon icon={faClock} color="purple" />
					&nbsp;&nbsp;&nbsp;
					{status == "online" ? status : moment(updatedAt).startOf("hour").fromNow()}
				</span>
			</div>
		</div>
	);
};

export default ActiveUser;
