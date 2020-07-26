import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

class NavBar extends Component {
	render() {
		return (
			<nav className="nav">
				<span className="nav-icon">
					<FontAwesomeIcon icon={faUser} />
				</span>
				<span className="nav-icon">
					<FontAwesomeIcon icon={faComment} />
				</span>
			</nav>
		);
	}
}

export default NavBar;
