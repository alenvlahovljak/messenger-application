import React from "react";

import { Avatar } from "../../components/UI";

import "./GlobalRoom.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const GlobalRoom = ({ joinGlobalRoom, lastMessage }) => {
	return (
		<div className="global-room" onClick={() => joinGlobalRoom()}>
			<Avatar src={defaultAvatar} size="6" />
			<div className="global-room-info">
				<span className="global-room-nick">Global Room</span>
				<span className="global-room-message">{lastMessage?.text ? lastMessage.text : "No new messages!"}</span>
			</div>
		</div>
	);
};

export default GlobalRoom;
