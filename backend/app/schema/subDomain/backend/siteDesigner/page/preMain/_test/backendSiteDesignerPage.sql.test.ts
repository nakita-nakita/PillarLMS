import makeBackendSiteDesignerPageSql from "../backendSiteDesignerPage.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerPage.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: backendSiteDesignerPage can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const addOne = await pageSql.addOne({
      slug: "/test/should-not-be-saved/",
      isReady: true,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.isReady).toEqual(true)
  })

  test("getOneById: backendSiteDesignerPage can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("updateOne: backendSiteDesignerPages can update record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const updatePage = await pageSql.updateOne({
      id: recordId,
      slug: "/tested/updated/",
      isReady: true,
    })
    expect(updatePage.data.dataValues.slug).toEqual("/tested/updated/")
    expect(updatePage.data.dataValues.isReady).toEqual(true)
  })

  test("updateOne: backendSiteDesignerPages can update record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getManyWithPagination = await pageSql.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: backendSiteDesignerPages can delete record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const deleteOne = await pageSql.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: backendSiteDesignerPage can add record.", async () => {
    const pageSql = makeBackendSiteDesignerPageSql(d)

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

