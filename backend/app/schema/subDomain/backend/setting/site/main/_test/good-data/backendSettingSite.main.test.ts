import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingSiteMain from "../../backendSettingSite.main"
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
jest.setTimeout(100000)


describe("test backendSettingSite.main.js", () => {
  let d: d_allDomain

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
  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingSite = makeBackendSettingSiteMain(d)

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
    const settingSite = makeBackendSettingSiteMain(d)

    const getOne = await settingSite.getOne()

    expect(getOne.data.dataValues.favicon).toEqual("favicon")
    expect(getOne.data.dataValues.tab).toEqual("tab")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

