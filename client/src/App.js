import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "./containers/LandingPage/LandingPage.js";
import Messenger from "./containers/Messenger/Messenger.js";

import "./App.css";

class App extends Component {
	render() {
		const { user } = this.props;
		return (
			<div>
				{user._id ? (
					<Switch>
						<Route exact path="/">
							<LandingPage {...this.props} />
						</Route>
						<Route exact path="/:id_1" render={(props) => <Messenger {...props} />} />
						<Route exact path="/:id_1/:id_2" render={(props) => <Messenger {...props} />} />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/">
							<LandingPage {...this.props} />
						</Route>
						<Route>
							<Redirect to="/" />
						</Route>
					</Switch>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser
	};
};

export default connect(mapStateToProps)(withRouter(App));
