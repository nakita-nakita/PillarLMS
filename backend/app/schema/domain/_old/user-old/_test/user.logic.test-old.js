const makeUserLogic = require("../user.logic");
const mockedDB = require("../../../models/mocked")

const userLogic = makeUserLogic(mockedDB);

test("Check user.logic getOneById function.", async () => {
  const user = await userLogic.getOneById({ id: 1 });
  expect(user.id).toBe(1)
  expect(user.username).toMatch("Bugs")
  expect(user.email).toMatch("bugs@acme.com")
})

test("Check user.logic getManyWithPagination function.", async () => {
  const users = await userLogic.getManyWithPagination({ q: "read", page: 0, pageSize: 20 });
  expect(users.rows[0].username).toMatch("Daffy")
})

test("Check user.logic addOne", async () => {
  const user = await userLogic.addOne({ username: "test", email: "test@example.com" });
  
  expect(user.username).toMatch("test")
  expect(user).toHaveProperty('id')
})

test("Check user.logic addMany", async () => {
  const users = await userLogic.addMany([{ username: "user1", email: "user1@example.com" }, {username: "user2", email: "user2@example.com"}]);
  
  expect(users[0].username).toBe("user1")
  expect(users[1].username).toBe("user2")
})

test("Check user.logic updateOne", async () => {
  const user = await userLogic.updateOne({id: 1, username: "asdf"});
  
  expect(user.username).toMatch("asdf")
})

test("Check user.logic deleteOne", async () => {
  const user = await userLogic.deleteOne({id: 1});
  
  expect(user.isDeleted).toBe(true)
})
