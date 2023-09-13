import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesigner_page.sql";
import makeBackendSiteDesignerPageMain from "../../backendSiteDesigner_page.main";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageValidation from "../backendSiteDesigner_page.validation"
jest.setTimeout(100000)


describe("test backendSiteDesigner_page.main.js with bad data.", () => {
  let d: d_sub
  let page : Model<backendSiteDesigner_page>

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

    const pageSql = makeBackendSiteDesignerPageSql(d)

    page = (await pageSql.addOne({
      data: {
        test: "data"
      },
      nickname: "test nickname",
      version: "test version"
    })).data

  }, 100000)



  test("backendSiteDesigner_page_updateOne_error0001: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updateOne = await pageMain.updateOne({
      id: ""
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0001")
  })

  test("backendSiteDesigner_page_updateOne_error0002: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updateOne = await pageMain.updateOne({
      
      id: "This is a UUID"
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0002")
  })

  test("backendSiteDesigner_page_updateOne_error0003: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updateOne = await pageMain.updateOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0003")
  })

  test("backendSiteDesigner_page_updateOne_error0004: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updateOne = await pageMain.updateOne({
      id: page.dataValues.id,
      nickname: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", // this is too long
      data: {},
      version: null,
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0004")
  })


  test("backendSiteDesigner_page_updateOne_error0005: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //name is taken
    const updateOne = await pageMain.updateOne({
      id: page.dataValues.id,
      nickname: "test nickname", 
      data: {},
      version: null,
    })
    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0005")
  })

  test("backendSiteDesigner_page_updateOne_error0006: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const updateOne = await pageMain.updateOne({
      id: page.dataValues.id,
      nickname: "name is good.",
      data: {},
      version: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", // this is too long
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0006")
  })

  test("backendSiteDesigner_page_updateOne_error0007: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const updateOne = await pageMain.updateOne({
      id: page.dataValues.id,
      nickname: "name is good.",
      data: {}, // this is empty
      version: "version is good.",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendSiteDesigner_page_updateOne_error0007")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})