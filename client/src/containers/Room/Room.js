import React from "react";

import Avatar from "../Avatar/Avatar";

import "./Room.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const Room = ({ room }) => {
	return (
		<div className="room">
			<Avatar src={room.avatar?.path || defaultAvatar} size="6" />
			<div className="room-info">
				<span className="room-nick">{room.to.username}</span>
				<span className="room-message">
					Hy aleen you pice Hy aleen you pice Hy aleen you pice Hy aleen you pice
				</span>
			</div>
		</div>
	);
};

export default Room;
