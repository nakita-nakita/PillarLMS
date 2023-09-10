import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerSettingReadAccessMain from "../../backendSiteDesignerSetting_readAccess.main";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageTemplateValidation from "../backendSiteDesignerSetting_readAccess.validation"
jest.setTimeout(100000)


describe("test backendSiteDesignerSetting_readAccess.main.js with bad data.", () => {
  let d: d_sub

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const transaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("backendSiteDesignerSetting_readAccess_setList_error0001: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList(null)

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0001")
  })


  test("backendSiteDesignerSetting_readAccess_setList_error0001: works, part 2", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0001")
  })

  test("backendSiteDesignerSetting_readAccess_setList_error0002: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([
      {
        userId: "I am a UUID"
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0002")
  })

  test("backendSiteDesignerSetting_readAccess_setList_error0003: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([
      {
        userId: "3a06e07e-0817-4800-83fb-3784d2ac585e"
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0003")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})