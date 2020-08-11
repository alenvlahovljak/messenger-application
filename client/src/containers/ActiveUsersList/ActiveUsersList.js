import React, { Component } from "react";
import { connect } from "react-redux";
import { addError, removeError, addInfoMessage, removeInfoMessage } from "../../store/actions";

import ActiveUser from "../ActiveUser/ActiveUser";
import { Loader } from "../../components/Animations";

import "./ActiveUsersList.css";

class ActiveUsersList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getAllActiveUsers();
	};

	render() {
		const { users } = this.props;
		const activeUsersList = users.map((user) => <ActiveUser {...this.props} key={user._id} user={user} />);
		return <div className="active-users-list">{activeUsersList.length == 0 ? <Loader /> : activeUsersList}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users.users
	};
};

export default connect(mapStateToProps, { addError, removeError, addInfoMessage, removeInfoMessage })(ActiveUsersList);
