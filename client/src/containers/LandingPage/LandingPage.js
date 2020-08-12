import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser, addError, removeError, removeInfoMessage } from "../../store/actions";

import { Loader } from "../../components/Animations";
import Popup from "../Popup/Popup";

import "./LandingPage.css";

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				latitude: undefined,
				longitude: undefined
			},
			isClicked: false
		};
	}

	componentDidMount = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const { longitude, latitude } = coords;
				this.setState({ location: { longitude, latitude } });
				this.props.removeError();
				this.props.removeInfoMessage();
			},
			(err) => {
				this.props.removeInfoMessage();
				this.props.addError(err.message);
			}
		);
	};

	onSubmitHandler = async (e) => {
		e.preventDefault();
		this.setState({ isClicked: true });
		const { latitude, longitude } = this.state.location;
		/*
		const geo = await axios.get(
			`https://geocode.xyz/${latitude},${longitude}?json=1&auth=914957577703788809108x6850`
		);
		geo.status == 200
			? await this.props.createUser({ city: geo.data.city })
			: this.props.addError(geo.data.error.description);*/
		await this.props.createUser({ city: "Sarajevo" });
		this.onClickHandler(this.props.user);
	};

	onClickHandler = (user) => {
		user._id && this.props.history.push("/rooms");
	};

	render() {
		return (
			<main className="main">
				<Popup />
				<div className="main-landing-page">
					<div className="landing-page">
						<span className="landing-page-info">
							Enter application to chat with users which are currently online.
						</span>
						<form onSubmit={this.onSubmitHandler} className="landing-page-form">
							{this.state.isClicked ? <Loader /> : <button className="landing-page-button">CHAT NOW </button>}
						</form>
					</div>
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser,
		error: state.errors.err
	};
};

export default connect(mapStateToProps, { createUser, addError, removeError, removeInfoMessage })(LandingPage);
