import React from "react";

import Avatar from "../Avatar/Avatar";

import "./GlobalRoom.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const GlobalRoom = ({ joinGlobalRoom, lastSendMessage, lastRecivedMessage }) => {
	return (
		<div className="global-room" onClick={() => joinGlobalRoom()}>
			<Avatar src={defaultAvatar} />
			<div className="global-room-info">
				<span className="global-room-nick">Global Room</span>
				<span className="global-room-message">
					{lastSendMessage?.text
						? `YOU: ${lastSendMessage.text}`
						: lastRecivedMessage?.text
						? lastRecivedMessage.text
						: "No new messages!"}
				</span>
			</div>
		</div>
	);
};

export default GlobalRoom;
