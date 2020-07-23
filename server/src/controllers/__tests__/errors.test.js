//require neccesary modules
const app = require("../../app");
const request = require("supertest");

test("Should get 404", async () => {
	await request(app).get("/*").send().expect(404);
});
