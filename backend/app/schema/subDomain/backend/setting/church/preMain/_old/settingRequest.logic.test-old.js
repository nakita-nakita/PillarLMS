const makeSettingRequestLogic = require("./settingRequest.logic")
const mockedDB = require("../../../../models/mocked")

const settingRequestLogic = makeSettingRequestLogic(mockedDB)

test("Check settingRequest.logic getOne function.", async () => {
    const settingRequest = await settingRequestLogic.getOne()
    expect(settingRequest).toHaveProperty("password")
    expect(settingRequest).toHaveProperty("type")
})

test("Check settingRequest.logic updateOne function.", async () => {
    const settingRequest = await settingRequestLogic.updateOne({ type: "REQUEST", password: "asdf@1!@#" })
    expect(settingRequest).toHaveProperty("password")
    expect(settingRequest).toHaveProperty("type")
})
