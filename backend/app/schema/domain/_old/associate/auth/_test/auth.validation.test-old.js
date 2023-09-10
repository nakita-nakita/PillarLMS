const makeAuthValidation = require("./auth.validation");
const mockedDB = require("../../../models/mocked")

const authValidation = makeAuthValidation(mockedDB);

test("Check auth.validation isPasswordValid function.", async () => {
  const isPasswordValid = await authValidation.isPasswordValid("password");

  expect(isPasswordValid.result).toBe(false)
})


test("Check auth.validation isEmailValid function.", async () => {
  const isEmailValid = await authValidation.isEmailValid("email@exmaple.com");

  expect(isEmailValid.result).toBe(true)

  const isEmailValid2 = await authValidation.isEmailValid("exmaple.com");

  expect(isEmailValid2.result).toBe(false)
})

test("Check auth.validation isEmailUnique function.", async () => {
  const isEmailUnique = await authValidation.isEmailUnique("email123@exmaple.com");

  expect(isEmailUnique.result).toBe(true)
})


test("Check auth.validation isUsernameUnique function.", async () => {
  const isUsernameUnique = await authValidation.isUsernameUnique("user123");

  expect(isUsernameUnique.result).toBe(true)
})

test("Check auth.validation doesAUserExists function.", async () => {
  const doesAUserExists = await authValidation.doesAUserExists();

  expect(doesAUserExists.result).toBe(false)
})


test("Check auth.validation canUserSignUp function.", async () => {
  const canUserSignUp = await authValidation.canUserSignUp();

  expect(canUserSignUp.result).toBe(true)
})
