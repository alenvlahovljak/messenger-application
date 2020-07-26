import React, { Component } from "react";

import MessengerRoom from "../MessengerRoom/MessengerRoom";
import NavBar from "../NavBar/NavBar";

import { UserInfo } from "../../components/UI";

import "./Messenger.css";

class Messenger extends Component {
	render() {
		return (
			<main className="main">
				<div className="messenger-box">
					<UserInfo />
					<MessengerRoom />
					<NavBar />
				</div>
			</main>
		);
	}
}

export default Messenger;
