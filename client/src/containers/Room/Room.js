import React from "react";

import { Avatar } from "../../components/UI";

import "./Room.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const Room = () => {
	return (
		<div className="room">
			<Avatar src={defaultAvatar} size="6" />
			<div className="room-info">
				<span className="room-nick">Alen</span>
				<span className="room-message">
					Hy aleen you pice Hy aleen you pice Hy aleen you pice Hy aleen you pice
				</span>
			</div>
		</div>
	);
};

export default Room;
