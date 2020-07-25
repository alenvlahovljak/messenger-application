import React from "react";

import "./Loader.css";

export const Loader = ({ width, height }) => {
	return <div className="loader" style={{ width: `${width}rem`, height: `${height}rem` }}></div>;
};
