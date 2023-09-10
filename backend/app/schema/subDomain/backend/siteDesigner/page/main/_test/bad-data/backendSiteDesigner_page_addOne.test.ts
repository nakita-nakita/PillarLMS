import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageMain from "../../backendSiteDesigner_page.main";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageValidation from "../backendSiteDesigner_page.validation"
jest.setTimeout(100000)


describe("test backendSiteDesigner_page.main.js with bad data.", () => {
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

  test("backendSiteDesigner_page_addOne_error0001: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const addOne = await pageMain.addOne({
      nickname: null, // this is null
      data: {},
      version: null,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0001")
  })


  test("backendSiteDesigner_page_addOne_error0002: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const addOne = await pageMain.addOne({
      nickname: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", // this is too long
      data: {},
      version: null,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0002")
  })


  test("backendSiteDesigner_page_addOne_error0003: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    await pageMain.addOne({
      nickname: "name is taken",
      data: {test: "test"},
      version: "this will pass",
    })

    const addOne = await pageMain.addOne({
      nickname: "name is taken",
      data: {},
      version: null,
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0003")
  })

  test("backendSiteDesigner_page_addOne_error0004: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const addOne = await pageMain.addOne({
      nickname: "name is good.",
      data: {},
      version: null, // this is null
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0004")
  })

  test("backendSiteDesigner_page_addOne_error0005: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const addOne = await pageMain.addOne({
      nickname: "name is good.",
      data: {},
      version: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", // this is too long
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0005")
  })

  test("backendSiteDesigner_page_addOne_error0006: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const addOne = await pageMain.addOne({
      nickname: "name is good.",
      data: null, // this is null
      version: "version is good.",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0006")
  })

  test("backendSiteDesigner_page_addOne_error0007: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    //isNameTaken

    const addOne = await pageMain.addOne({
      nickname: "name is good.",
      data: {}, // this is empty
      version: "version is good.",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendSiteDesigner_page_addOne_error0007")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})