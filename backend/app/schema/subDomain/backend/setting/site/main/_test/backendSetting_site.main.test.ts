import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingSiteMain from "../backendSetting_site.main";
jest.setTimeout(100000)

describe("test backendSetting_site.main.js", () => {
  let d: d_sub

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("updateOne: backendSetting_site can update record.", async () => {
    const settingPassword = makeBackendSettingSiteMain(d)

    const updateOne = await settingPassword.updateOne({
      churchShortName: "test",
      favicon: "test",
    })
    expect(updateOne.data.dataValues.churchShortName).toEqual("test")
    expect(updateOne.data.dataValues.favicon).toEqual("test")
  })

  test("getOne: backendSetting_site can get record.", async () => {
    const settingPassword = makeBackendSettingSiteMain(d)

    const getOne = await settingPassword.getOne()
    expect(getOne.data.dataValues.churchShortName).toEqual("test")
    expect(getOne.data.dataValues.favicon).toEqual("test")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

