import React from "react";

import { Avatar } from "../../components/UI";

import "./ActiveUser.css";

import defaultAvatar from "../../public/images/default-avatar.png";

const ActiveUser = () => {
	return (
		<div className="active-user">
			<Avatar src={defaultAvatar} size="6" />
			<div className="active-user-info">
				<span className="active-user-nick">John</span>
				<span className="active-user-activity">
					Hy aleen you pice Hy aleen you pice Hy aleen you pice Hy aleen you pice
				</span>
			</div>
		</div>
	);
};

export default ActiveUser;
