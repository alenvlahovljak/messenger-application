import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

class NavBar extends Component {
	render() {
		return (
			<nav className="nav">
				<NavLink activeStyle={{ backgroundColor: "#1D77CD" }} to="/active-users" className="nav-icon">
					<FontAwesomeIcon icon={faUser} />
				</NavLink>
				<NavLink activeStyle={{ backgroundColor: "#1D77CD" }} to="/rooms" className="nav-icon">
					<FontAwesomeIcon icon={faComment} />
				</NavLink>
			</nav>
		);
	}
}

export default NavBar;
