import axios from "../config/axios";
import Axios from "axios";

export const apiCall = (method, path, data) => {
	return new Promise((resolve, reject) => {
		return axios[method.toLowerCase()](path, data)
			.then((res) => {
				return resolve(res.data);
			})
			.catch((err) => {
				return reject(err.response.data.error);
			});
	});
};

export const apiCallAsync = async (method, path, data) => {
	try {
		let res = await Axios({
			method: method.toLowerCase(),
			path,
			data
		});
		return res;
	} catch (err) {
		console.log("ERR", err);
		return err.response;
	}
};

export const createUserAPI = (method, url, data) => {
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
