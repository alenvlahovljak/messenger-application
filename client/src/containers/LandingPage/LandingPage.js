import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createUser, addError, removeError } from "../../store/actions";

import { Loader } from "../../components/Animations";
import { ErrorMessageBox } from "../../components/UI";

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
			},
			(err) => {
				this.props.addError(err.message);
			}
		);
	};

	onSubmitHandler = async (e) => {
		e.preventDefault();
		this.setState({ isClicked: true });
		const { latitude, longitude } = this.state.location;
		const geo = await axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`);
		console.log(geo);
		geo.status == 200
			? await this.props.createUser({ city: geo.data.city })
			: this.props.addError(geo.data.error.description);
		this.onClickHandler(this.props.user);
	};

	onClickHandler = (user) => {
		user._id && this.props.history.push("/messenger");
		this.props.removeError();
	};

	render() {
		console.log("PORPs", this.props);
		return (
			<main className="landing-page-main">
				<ErrorMessageBox
					display={this.props.error ? "block" : "none"}
					height="3"
					width="10"
					message={this.props.error}
				/>
				<div className="landing-page">
					<span className="landing-page-info">
						Enter application to chat with users which are currently online.
					</span>
					<form onSubmit={this.onSubmitHandler} className="landing-page-form">
						{this.state.isClicked ? (
							<Loader height="3" width="3" />
						) : (
							<button className="landing-page-button">CHAT NOW</button>
						)}
					</form>
				</div>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user,
		error: state.errors.err
	};
};

export default connect(mapStateToProps, { createUser, addError, removeError })(LandingPage);
