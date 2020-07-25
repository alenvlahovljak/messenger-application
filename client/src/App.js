import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {} from "./store/actions/user";

import LandingPage from "./containers/LandingPage/LandingPage.js";
import Messenger from "./containers/Messenger/Messenger.js";

import "./App.css";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/">
					<LandingPage {...this.props} />
				</Route>
				<Route exact path="/messenger">
					<Messenger />
				</Route>
			</Switch>
		);
	}
}

export default withRouter(App);
