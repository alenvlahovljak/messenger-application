import React from "react";
import moment from "moment";

import { BASE_URL } from "../../../config/api";

import Avatar from "../../../containers/Avatar/Avatar";

export const Message = ({ isCurrentUser, isGlobalChat, from, to, text, timestamp }) => {
	return (
		<div className={`messages-box-content ${isCurrentUser && "current-user"}`}>
			{!isCurrentUser && (
				<Avatar src={from.avatar?.path && `${BASE_URL}/static/${from.avatar.path}?${Date.now()}`} />
			)}
			<div className="message-box-info">
				{isGlobalChat && <span className="messages-box-username">{from.username}</span>}
				<div className={`messages-box-message ${isCurrentUser && "current-user"}`}>
					<p className="messages-box-text">{text}</p>
					<span className="messages-box-time">{moment(timestamp).format("LT")}</span>
				</div>
			</div>
		</div>
	);
};
