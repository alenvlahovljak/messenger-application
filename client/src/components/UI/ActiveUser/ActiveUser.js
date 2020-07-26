import React from "react";

import { Avatar } from "../../UI";

import "./ActiveUser.css";

import defaultAvatar from "../../../public/images/default-avatar.png";

export const ActiveUser = () => {
	return (
		<div className="active-user">
			<Avatar src={defaultAvatar} size="6" />
			<div className="active-user-info">
				<span className="active-user-nick">Alen</span>
				<span className="active-user-message">Hy aleen you pice</span>
			</div>
		</div>
	);
};
