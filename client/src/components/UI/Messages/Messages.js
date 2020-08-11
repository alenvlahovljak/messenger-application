import React from "react";

import { Message } from "..";

export const Messages = ({ match, user, messages, room }) => {
	const globalRoomMessages = messages.filter((globalRoomMessage) => match.params.room_id == globalRoomMessage.to._id);
	const globalRoomMessagesRender = globalRoomMessages.map(({ text, from, to, timestamp }) => {
		return from.username == user.username ? (
			<Message key={timestamp} isCurrentUser text={text} timestamp={timestamp} />
		) : (
			<Message key={timestamp} isGlobalChat from={from} text={text} timestamp={timestamp} />
		);
	});
	const roomMessagesRender = messages.map(({ text, from, to, timestamp }) => {
		if (room._id == to._id && match.params.room_id == from._id)
			return <Message key={timestamp} isCurrentUser text={text} timestamp={timestamp} />;
		if (match.params.room_id == to._id && room._id == from._id)
			return <Message key={timestamp} from={from} to={to} text={text} timestamp={timestamp} />;
	});
	return <div>{match.params.room_id == "global" ? globalRoomMessagesRender : roomMessagesRender}</div>;
};
