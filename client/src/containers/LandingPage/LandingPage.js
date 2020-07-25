import React, { Component } from "react";
import { connect } from "react-redux";

import { createUser, addError, removeError } from "../../store/actions";

import "./LandingPage.css";

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				latitude: undefined,
				longitude: undefined
			}
		};
	}

	componentDidMount = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const { longitude, latitude } = coords;
				this.setState({ location: { longitude, latitude } });
				this.props.removeError();
			},
			(err) => {
				this.props.addError(err.message);
			}
		);
	};

	onSubmitHandler = (e) => {
		e.preventDefault();
		this.props.createUser(this.state);
	};

	render() {
		return (
			<main className="landing-page-main">
				<div className="landing-page">
					<span className="landing-page-info">
						Enter application to chat with users which are currently online.
					</span>
					<form onSubmit={this.onSubmitHandler} className="landing-page-form">
						<button className="landing-page-button">CHAT NOW</button>
					</form>
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user
	};
};

export default connect(mapStateToProps, { createUser, addError, removeError })(LandingPage);
