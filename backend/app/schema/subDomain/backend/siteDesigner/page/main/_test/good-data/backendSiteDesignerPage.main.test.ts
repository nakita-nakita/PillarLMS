import makeBackendSiteDesignerPageMain from "../../backendSiteDesignerPage.main";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerPage.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const addOne = await pageMain.addOne({
      slug: "/test/should-not-be-saved/",
      isReady: true,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
    expect(addOne.data.dataValues.isReady).toEqual(true)
  })

  test("getMany: can get all records.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getMany = await pageMain.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("getOneBySlug: can get record by slug.", async () => {
    const pageSql = makeBackendSiteDesignerPageMain(d)

    const getOneBySlug = await pageSql.getOneBySlug({
      slug: "/test/should-not-be-saved/"
    })

    expect(getOneBySlug.data.dataValues.slug).toEqual("/test/should-not-be-saved/")
  })

  test("updateOne: can update record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const updatePage = await pageMain.updateOne({
      id: recordId,
      slug: "/tested/updated/",
      isReady: true,
    })
    expect(updatePage.data.dataValues.slug).toEqual("/tested/updated/")
    expect(updatePage.data.dataValues.isReady).toEqual(true)
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getManyWithPagination = await pageMain.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: backendSiteDesignerPages can delete record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const deleteOne = await pageMain.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

