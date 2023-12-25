import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageSql from "../clientSitePage.sql"

jest.setTimeout(100000)


describe("test clientSitePage.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const pageSql = makeClientSitePageSql(d)

    const addOne = await pageSql.addOne({
      slug: "/test/should-not-be-saved/",
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneById: can get one record.", async () => {
    const pageSql = makeClientSitePageSql(d)

    const getOneById = await pageSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get one record.", async () => {
    const pageSql = makeClientSitePageSql(d)

    const getOneById = await pageSql.getOneBySlug({
      slug: "/test/should-not-be-saved/",
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("updateOne: can update record.", async () => {
    const pageSql = makeClientSitePageSql(d)

    const updatePage = await pageSql.updateOne({
      id: recordId,
      slug: "/tested/updated/",
    })
    expect(updatePage.data.dataValues.slug).toEqual("/tested/updated/")
  })
  
  test("deleteOne: can delete record.", async () => {
    const pageSql = makeClientSitePageSql(d)

    const deleteOne = await pageSql.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check item is deleted.", async () => {
    const pageSql = makeClientSitePageSql(d)

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

