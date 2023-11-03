import makeBackendMediaManagerFileSql from "../backendMediaManagerFile.sql";
import makeBackendUserMain from "../../../user/main/backendUser.main";
import { addOneBackendUserResponse } from "../../../user/main/scripts/main/addOne.script";
import makeBackendMediaManagerFileValidation from "../backendMediaManagerFile.validation";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendMediaManagerFile.validation.js", () => {
  let d: dependencies;
  let firstFileRecordId: string;
  let secondFileRecordId: string;
  let user1: addOneBackendUserResponse

  beforeAll(async () => {
    
    d = await makeDTestObj()

    const backendUser = makeBackendUserMain(d)

    user1 = (await backendUser.addOne({
      email: "testingMediaFile@test.com",
      password: "ASDFasdf1!",
      username: "testing_media_file_user1",
    })).data

    
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const file = await mediaManagerFileSql.addOne({
      systemFileName: "systemFileName.jpg",
      url: "/api/v1/media-manager/test.jpg",
      userFileName: "userFileName.jpg",
      uploadedBy: user1.id,
    })

    // record root file
    firstFileRecordId = file.data.dataValues.id

  }, 100000)

  test("isIdValid: is the id a valid record?", async () => {
    const mediaManagerFileValidation = makeBackendMediaManagerFileValidation(d)
    
    const validate = await mediaManagerFileValidation.isIdValid({
        id: firstFileRecordId
    })

    expect(validate.result).toBe(true)

    const notValid = await mediaManagerFileValidation.isIdValid({
        id: '5bcfa1c0-2a62-4f6b-b1ff-011a745b09ca'
    })

    expect(notValid.result).toBe(false)
  })

})

