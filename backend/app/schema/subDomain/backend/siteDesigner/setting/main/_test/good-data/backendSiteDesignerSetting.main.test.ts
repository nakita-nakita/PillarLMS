import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendSiteDesignerSettingMain from "../../backendSiteDesignerSetting.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerSetting.sql.js", () => {
  let d: d_sub;

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

  test("updateOne & getOne: can update and get record.", async () => {
    const siteDesignerSettingSql = makeBackendSiteDesignerSettingMain(d)

    const updateOne = await siteDesignerSettingSql.updateOne({
      canAllRead: true,
      canAllUpdate: true,
    })
    expect(updateOne.success).toBe(true)
    expect(updateOne.data.dataValues.canAllRead).toBe(true)
    expect(updateOne.data.dataValues.canAllUpdate).toBe(true)

    const getOne = await siteDesignerSettingSql.getOne()
    expect(getOne.success).toBe(true)
    expect(getOne.data.dataValues.canAllRead).toBe(true)
    expect(getOne.data.dataValues.canAllUpdate).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

