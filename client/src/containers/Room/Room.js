import React from "react";

import Avatar from "../Avatar/Avatar";

import "./Room.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const Room = ({ to, lastSendMessage, lastRecivedMessage }) => {
	return (
		<div className="room">
			<Avatar src={to.avatar?.path || defaultAvatar} />
			<div className="room-info">
				<span className="room-nick">{to.username}</span>
				<span className="room-message">
					{lastSendMessage?.text ? `YOU: ${lastSendMessage.text}` : lastRecivedMessage?.text}
				</span>
			</div>
		</div>
	);
};

export default Room;
