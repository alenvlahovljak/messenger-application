import axios from "axios";

import { BASE_URL } from "./api";

const instance = axios.create({
	baseURL: BASE_URL
});

axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

instance.interceptors.request.use(
	(response) => response,
	(err) => {
		if (err && err.response) return Promise.reject(err.response);
		if (err && err.request) return Promise.reject(err.request);
		return Promise.reject(err);
	}
);

export default instance;
