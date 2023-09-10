const makeUserValidation = require("./user.validation");
const mockedDB = require("../../../models/mocked")

const userValidation = makeUserValidation(mockedDB);

test("Check user.validation doesUserHavePermission function.", async () => {
  const doesUserHavePermission = await userValidation.doesUserHavePermission({ permisisonId: 1, userId: 1 });

  expect(doesUserHavePermission.result).toBe(true)
})

test("Check user.validation doesUserHaveRole function.", async () => {
  const doesUserHaveRole = await userValidation.doesUserHaveRole({ roleId: 1, userId: 1 });

  expect(doesUserHaveRole.result).toBe(true)
})

