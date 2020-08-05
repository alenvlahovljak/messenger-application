import React from "react";

import { Avatar } from "../../components/UI";

import "./GlobalRoom.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const GlobalRoom = ({ joinGlobalRoom }) => {
	return (
		<div className="global-room" onClick={() => joinGlobalRoom()}>
			<Avatar src={defaultAvatar} size="6" />
			<div className="global-room-info">
				<span className="global-room-nick">Global Room</span>
				<span className="global-room-message">
					Hy aleen you pice Hy aleen you pice Hy aleen you pice Hy aleen you pice
				</span>
			</div>
		</div>
	);
};

export default GlobalRoom;
