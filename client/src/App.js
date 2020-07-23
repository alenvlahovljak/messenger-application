import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import {} from "./store/actions/user";

import LandingPage from "./containers/LandingPage/LandingPage.js";

import "./App.css";

class App extends Component {
	render() {
		return <LandingPage />;
	}
}

export default App;
