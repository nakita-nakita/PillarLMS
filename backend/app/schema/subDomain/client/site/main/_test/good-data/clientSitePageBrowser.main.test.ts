import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSitePageMain from "../../../main/clientSitePage.main";
import makeClientSitePageBrowserMain from "../../clientSitePageBrowser.main";
jest.setTimeout(100000)


describe("test clientSitePageBrowser.main.js", () => {
  let d: dependencies
  let recordId: string
  let pageRecordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageMain = makeClientSitePageMain(d)

    const pageRecord = await pageMain.addOne({
      slug: "/testing/should-never-be-saved-123012301230/123/123/123/"
    })

    pageRecordId = pageRecord.data.dataValues.id

  }, 100000)

  test("upsertOne: can update record.", async () => {
    const pageMain = makeClientSitePageBrowserMain(d)

    const upsertOne = await pageMain.upsertOne({
      pageId: pageRecordId,
      tabName: "blah",
    })
    recordId = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah")
  })

  test("getOneById: can get record.", async () => {
    const pageMain = makeClientSitePageBrowserMain(d)

    const getOneByPageId = await pageMain.getOneByPageId({
      pageId: pageRecordId,
    })

    expect(getOneByPageId.data.dataValues.pageId).toEqual(pageRecordId)
    expect(getOneByPageId.data.dataValues.tabName).toEqual("blah")
  })

  test("upsertOne: can update record.", async () => {
    const pageMain = makeClientSitePageBrowserMain(d)

    const upsertOne = await pageMain.upsertOne({
      id: recordId,
      pageId: pageRecordId,
      tabName: "blah2",
    })

    expect(upsertOne.data.dataValues.pageId).toEqual(pageRecordId)
    expect(upsertOne.data.dataValues.tabName).toEqual("blah2")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

