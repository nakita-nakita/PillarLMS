import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSql from "../backendSiteDesignerPage.sql";
import makeBackendSiteDesignerPageSectionLoudSql from "../backendSiteDesignerPageSectionLoud.sql";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageSectionLoud.sql.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageSql = makeBackendSiteDesignerPageSql(d)

    const page = await pageSql.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      author: "author",
      name: "name",
      menuJsonB: JSON.stringify({ testing: "testing" }),
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      isReady: true,
    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.author).toEqual("author")
    expect(upsertOne.data.dataValues.name).toEqual("name")
    expect(upsertOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(upsertOne.data.dataValues.isReady).toBe(true)

  })

  test("getOneById: can get record by id.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const getOneById = await loud.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneById.data.dataValues.isReady).toBe(true)
  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.menuJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOneByPageId.data.dataValues.isReady).toBe(true)
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudSql(d)

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

