import axios from "../config/axios";

export const createUserAPI = (method, url, data) => {
	return axios({
		method,
		url,
		data
	});
};

export const setUserSocketIdAPI = (method, url, data) => {
	return axios({
		method,
		url,
		data
	});
};

export const setAvatarAPI = (method, url, data) => {
	return axios({
		method,
		url,
		data,
		headers: {
			"Content-type": "multipart/form-data"
		}
	});
};

export const createRoomAPI = (method, url, data) => {
	return axios({
		method,
		url,
		data
	});
};
