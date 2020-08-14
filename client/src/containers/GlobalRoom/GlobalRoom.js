import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setCurrentRoom, loadMessages } from "../../store/actions";

import Avatar from "../Avatar/Avatar";

import "./GlobalRoom.css";

import globalRoomAvatar from "../../public/images/global-room-avatar.png";

const GlobalRoom = ({ joinGlobalRoom, setCurrentRoom, loadMessages, lastSendMessage, lastRecivedMessage }) => {
	useEffect(() => {
		loadMessages();
	}, []);

	return (
		<div
			className="global-room"
			onClick={() => {
				joinGlobalRoom();
				setCurrentRoom({ _id: "global", username: "Global Room" });
			}}
		>
			<Avatar src={globalRoomAvatar} />
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

export default connect(null, { setCurrentRoom, loadMessages })(GlobalRoom);
