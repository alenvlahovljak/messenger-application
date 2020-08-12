import React, { Component } from "react";
import { connect } from "react-redux";

import { setAvatar } from "../../store/actions";

import "./Avatar.css";
import styles from "./avatar.module.css";

import defaultAvatar from "../../public/images/default-avatar.png";

class Avatar extends Component {
	constructor(props) {
		super(props);
	}

	onClickHandler = () => {
		this.setState({ upload: false });
	};

	onChangeHandler = (e) => {
		const { user } = this.props;
		const { files } = e.target;
		const data = new FormData();
		data.append("avatar", files[0]);
		this.props.setAvatar(user, data);
	};

	render() {
		const { src = defaultAvatar, alt = "User didn't provide avatar", upload } = this.props;
		return upload ? (
			<label onClick={this.onClickHandler} htmlFor="avatar-upload" style={{ position: "relative" }}>
				<div className="avatar-activity"></div>
				<img onChange={this.change} className={styles.Upload} src={src} alt={`${alt}'s avatar`} />
				<input onChange={this.onChangeHandler} id="avatar-upload" className="avatar-upload" type="file" required />
			</label>
		) : (
			<span style={{ position: "relative" }}>
				<img src={src} alt={alt} />
			</span>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.currentUser
	};
};

export default connect(mapStateToProps, { setAvatar })(Avatar);
