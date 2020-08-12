import React from "react";

import Avatar from "../Avatar/Avatar";

import "./Room.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const Room = ({ from, to, lastSendMessage, lastRecivedMessage }) => {
	console.log("The last recived message is", lastRecivedMessage);
	console.log("TO", to);
	console.log("FROM", from);
	return (
		<div className="room">
			<Avatar src={to.avatar?.path || defaultAvatar} size="6" />
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
