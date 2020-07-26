import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LandingPage from "./containers/LandingPage/LandingPage.js";
import Messenger from "./containers/Messenger/Messenger.js";

import "./App.css";

class App extends Component {
	render() {
		const { user } = this.props;
		return (
			<div>
				<Switch>
					<Route exact path="/">
						<LandingPage {...this.props} />
					</Route>
					<Route exact path="/messenger">
						{/*user._id ? <Messenger /> : <Redirect to="/" />*/}
						<Messenger />
					</Route>
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.user
	};
};

export default connect(mapStateToProps)(withRouter(App));
