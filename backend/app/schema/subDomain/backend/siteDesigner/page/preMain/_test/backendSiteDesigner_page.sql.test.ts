import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import backendSiteDesigner_page from "../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageSql from "../backendSiteDesigner_page.sql";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageValidation from "../backendSiteDesigner_page.validation"
jest.setTimeout(100000)


describe("test backendSiteDesignerPage.sql.js", () => {
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

  test("getManyWithPagination: db backendSiteDesignerPages has been seeded.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const pages = await pageSql.getManyWithPagination({})

    expect(pages.data.rows.length).toEqual(0)
  })

  test("addOne & getOne: backendSiteDesignerPages can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const newPage = await pageSql.addOne({
      nickname: "Cool Page!",
      data: { test: "test" },
      version: "1",
      isReady: true,
    })
    expect(newPage.data.dataValues.nickname).toEqual("Cool Page!")
    expect(newPage.data.dataValues.data).toEqual({ test: "test" })
    expect(newPage.data.dataValues.version).toEqual("1")
    expect(newPage.data.dataValues.isReady).toEqual(true)

    const getPage = await pageSql.getOneById({
      id: newPage.data.dataValues.id,
    })
    expect(getPage.data.dataValues.nickname).toEqual("Cool Page!")
    expect(getPage.data.dataValues.data).toEqual({ test: "test" })
    expect(getPage.data.dataValues.version).toEqual("1")
    expect(getPage.data.dataValues.isReady).toEqual(true)
  })

  test("updateOne: backendSiteDesignerPages can update record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const pages = await pageSql.getManyWithPagination({})

    const existingPage = pages.data.rows.filter(page => page.dataValues.nickname === "Cool Page!")[0]

    const updatePage = await pageSql.updateOne({
      id: existingPage.dataValues.id,
      nickname: "Cool Page updated!",
      data: { updated: "updated" },
      version: "2",
      isReady: false,
    })
    expect(updatePage.data.dataValues.nickname).toEqual("Cool Page updated!")
    expect(updatePage.data.dataValues.data).toEqual({ test: "test", updated: "updated" })
    expect(updatePage.data.dataValues.version).toEqual("2")
    expect(updatePage.data.dataValues.isReady).toEqual(false)
  })

  test("deleteOne: backendSiteDesignerPages can delete record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const pages = await pageSql.getManyWithPagination({})

    const existingPage = pages.data.rows.filter(page => page.dataValues.nickname === "Cool Page updated!")[0]

    const deletedPage = await pageSql.deleteOne({
      id: existingPage.dataValues.id,
    })

    expect(deletedPage.success).toBe(true)
  })
  afterAll(async () => {
    await d.transaction.rollback();
  })
})

