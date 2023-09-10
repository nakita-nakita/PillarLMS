const makeAuthLogic = require("../auth.logic");
const mockedDB = require("../../../models/mocked")

const authLogic = makeAuthLogic(mockedDB);

test("Check auth.logic signToken function.", async () => {
    const authToken = await authLogic.signToken({ userId: 1 });
    expect(authToken).toHaveProperty("token")
    expect(authToken).toHaveProperty("userId")
    expect(authToken.token).not.toBeUndefined()
    expect(authToken.userId).not.toBeUndefined()
})

test("Check auth.logic createFirstUser function.", async () => {
    const createFirstUser = await authLogic.createFirstUser({ username: "asdf", email: "asdf@asdf.com" });
    expect(createFirstUser.result).toBe(true)
})