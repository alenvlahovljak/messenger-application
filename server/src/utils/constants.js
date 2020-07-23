//define database constants
const DATABASE = {
	LOCAL: process.env.LOCAL_DB,
	ATLAS: process.env.ATLAS_DB
};

//export constants
module.exports = { DATABASE };
