import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendMediaManagerFileSql from "../backendMediaManagerFile.sql";
import { Model } from "sequelize";
import makeBackendUserMain from "../../../user/main/backendUser.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import { addOneBackendUserResponse } from "../../../user/main/scripts/main/addOne.script";
import makeBackendMediaManagerFolderSql from "../backendMediaManagerFolder.sql";
import makeBackendMediaManagerFileValidation from "../backendMediaManagerFile.validation";
jest.setTimeout(100000)

describe("test backendMediaManagerFile.validation.js", () => {
  let d: d_allDomain;
  let firstFileRecordId: string;
  let secondFileRecordId: string;
  let user1: addOneBackendUserResponse

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const domainTransaction = await domainDb.transaction();
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt,
      ]
    };

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

