import React from "react";
import moment from "moment";

import { Avatar } from "../../components/UI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlobe } from "@fortawesome/free-solid-svg-icons";

import "./ActiveUser.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const ActiveUser = ({ username, status, updatedAt }) => {
	return (
		<div className="active-user">
			<Avatar src={defaultAvatar} size="6" />
			<div className="active-user-info">
				<span className="active-user-nick">{username}</span>
				<span className="active-user-activity">
					<FontAwesomeIcon icon={faClock} color="purple" />
					&nbsp;&nbsp;&nbsp;
					{updatedAt == undefined
						? status + <FontAwesomeIcon icon={faClock} color="purple" />
						: moment(updatedAt).startOf("hour").fromNow()}
				</span>
			</div>
		</div>
	);
};

export default ActiveUser;
