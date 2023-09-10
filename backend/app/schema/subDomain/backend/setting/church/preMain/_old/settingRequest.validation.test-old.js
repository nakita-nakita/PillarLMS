const makeSettingRequestValidation = require("./settingRequest.validation")
const mockedDB = require("../../../../models/mocked")

const settingRequestValidation = makeSettingRequestValidation(mockedDB)

test("Check settingRequest.validation canUserSignUp function.", async () => {
    const canUserSignUp = await settingRequestValidation.canUserSignUp()
    expect(canUserSignUp.result).toBe(true)
})

