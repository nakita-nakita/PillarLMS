import makeBackendSiteDesignerPageBrowserSql from "../backendSiteDesignerPageBrowser.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPageMain from "../../main/backendSiteDesignerPage.main";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageBrowser.sql.js", () => {
  let d: dependencies
  let recordId: string
  let pageRecordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageMain = makeBackendSiteDesignerPageMain(d)

    const pageRecord = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/"
    })

    pageRecordId = pageRecord.data.dataValues.id

  }, 100000)

  test("upsertOne: can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const upsertOne = await pageSql.upsertOne({
      pageId: pageRecordId,
      tabName: "blah",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneById: can get record.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const getOneByPageId = await pageSql.getOneByPageId({
      pageId: pageRecordId,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(pageRecordId)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  test("upsertOne: can edit record.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const upsertOne = await pageSql.upsertOne({
      id: recordId,
      pageId: pageRecordId,
      tabName: "blah2",
    })

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah2")
  })
  
  test("getMany: can get all records.", async () => {
    const pageSql = makeBackendSiteDesignerPageBrowserSql(d)

    const getMany = await pageSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

