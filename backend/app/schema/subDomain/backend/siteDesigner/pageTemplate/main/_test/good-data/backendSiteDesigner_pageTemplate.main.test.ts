import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageTemplateMain from "../../backendSiteDesigner_pageTemplate.main";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageTemplateValidation from "../backendSiteDesigner_pageTemplate.validation"
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js", () => {
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

  test("getManyWithPagination: db backendSiteDesignerPageTemplates has been seeded.", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const pageTemplates = await pageTemplateMain.getManyWithPagination({})

    expect(pageTemplates.data.rows.length).toEqual(0)
  })

  test("addOne & getOne: can add record.", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const newPageTemplate = await pageTemplateMain.addOne({
      nickname: "Cool PageTemplate!",
      data: { test: "test" },
      version: "1",
      isReady: true,
    })
    expect(newPageTemplate.data.dataValues.nickname).toEqual("Cool PageTemplate!")
    expect(newPageTemplate.data.dataValues.data).toEqual({ test: "test" })
    expect(newPageTemplate.data.dataValues.version).toEqual("1")
    expect(newPageTemplate.data.dataValues.isReady).toEqual(true)

    const getPageTemplate = await pageTemplateMain.getOneById({
      id: newPageTemplate.data.dataValues.id,
    })
    expect(getPageTemplate.data.dataValues.nickname).toEqual("Cool PageTemplate!")
    expect(getPageTemplate.data.dataValues.data).toEqual({ test: "test" })
    expect(getPageTemplate.data.dataValues.version).toEqual("1")
    expect(getPageTemplate.data.dataValues.isReady).toEqual(true)
  })

  test("updateOne: can update record.", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const pageTemplates = await pageTemplateMain.getManyWithPagination()

    const existingPageTemplate = pageTemplates.data.rows.filter(pageTemplate => pageTemplate.dataValues.nickname === "Cool PageTemplate!")[0]

    const updatePageTemplate = await pageTemplateMain.updateOne({
      id: existingPageTemplate.dataValues.id,
      nickname: "Cool PageTemplate updated!",
      data: { updated: "updated" },
      version: "2",
      isReady: false,
    })
    expect(updatePageTemplate.data.dataValues.nickname).toEqual("Cool PageTemplate updated!")
    expect(updatePageTemplate.data.dataValues.data).toEqual({ test: "test", updated: "updated" })
    expect(updatePageTemplate.data.dataValues.version).toEqual("2")
    expect(updatePageTemplate.data.dataValues.isReady).toEqual(false)
  })

  test("deleteOne: can delete record.", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const pageTemplates = await pageTemplateMain.getManyWithPagination({})

    const existingPageTemplate = pageTemplates.data.rows.filter(pageTemplate => pageTemplate.dataValues.nickname === "Cool PageTemplate updated!")[0]

    const deletedPageTemplate = await pageTemplateMain.deleteOne({
      id: existingPageTemplate.dataValues.id,
    })

    expect(deletedPageTemplate.success).toBe(true)
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})

