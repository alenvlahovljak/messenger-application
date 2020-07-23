import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/user";

import "./LandingPage.css";

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "Zenica"
		};
	}
	handlerCreateUser = () => {
		console.log("hello");
		this.props.createUser(this.state.location);
	};
	render() {
		return (
			<main className="landing-page">
				<div className="landing-page-form">
					<span className="landing-page-info">
						Enter application to chat with users which are currently online.
					</span>
					<button onClick={() => this.handlerCreateUser} className="landing-page-button">
						ENTER!
					</button>
				</div>
			</main>
		);
	}
}

export default connect(null, { createUser })(LandingPage);
