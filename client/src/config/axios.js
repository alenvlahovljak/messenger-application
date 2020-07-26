import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:8000"
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
