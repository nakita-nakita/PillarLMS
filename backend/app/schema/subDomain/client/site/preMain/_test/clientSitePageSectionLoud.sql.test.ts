import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageSql from "../clientSitePage.sql"
import makeClientSitePageSectionLoudSql from "../clientSitePageSectionLoud.sql"

jest.setTimeout(100000)


describe("test clientSitePageSectionLoud.sql.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageSql = makeClientSitePageSql(d)

    const page = await pageSql.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",

    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.webAssetImport).toEqual("webAssetImport")

  })

  test("getOneById: can get record by id.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const getOneById = await loud.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeClientSitePageSectionLoudSql(d)

    const deleteOne = await loud.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data).toBeNull()
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

