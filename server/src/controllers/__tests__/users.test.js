//require neccesary modules
const fs = require("fs");
const path = require("path");
const app = require("../../app");
const request = require("supertest");

//reqire models and db's populate method
const {
	users: { userOne },
	populateDB
} = require("../../fixtures/db/users");

//require necessary model
const User = require("../../models/User");

//delete db before running each test
beforeEach(populateDB);

//delete avatars
afterAll(() => {
	const dir = path.join(__dirname, "../../../public/storage/avatars");
	fs.readdir(dir, (err, files) => {
		if (err) throw err;
		for (let file of files) {
			fs.unlink(path.join(dir, file), (err) => {
				if (err) throw err;
			});
		}
	});
});

test("Should create new user", async () => {
	const res = await request(app)
		.post("/users")
		.send({
			location: "Moscow"
		})
		.expect(201);
});

test("Should upload user's avatar image", async () => {
	await request(app).post(`/users/${userOne._id}/avatar`).attach("avatar", "./src/fixtures/avatar.jpg").expect(200);
	const user = await User.findById(userOne._id);
	expect(user.avatar).toMatchObject({
		filename: expect.any(String),
		path: expect.any(String)
	});
});
