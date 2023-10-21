import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingSiteSql from "../backendSettingSite.sql"
jest.setTimeout(100000)


describe("test backendSettingSite.sql.js", () => {
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

  test("upsertOne: can edit record.", async () => {
    const settingSite = makeBackendSettingSiteSql(d)

    const updateOne = await settingSite.upsertOne({
      favicon: "favicon",
      tab: "tab",
      isReady: true,

    })

    expect(updateOne.data.dataValues.favicon).toEqual("favicon")
    expect(updateOne.data.dataValues.tab).toEqual("tab")
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingSite = makeBackendSettingSiteSql(d)

    const getOne = await settingSite.getOne()

    expect(getOne.data.dataValues.favicon).toEqual("favicon")
    expect(getOne.data.dataValues.tab).toEqual("tab")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

