import { v4 as uuidv4 } from "uuid";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSitePageMain from "../../clientSitePage.main"
import makeClientSitePageSectionLoudMain from "../../clientSitePageSectionLoud.main"
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

jest.setTimeout(100000)


describe("test clientSitePageSectionLoud.main.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageMain = makeClientSitePageMain(d)

    const page = await pageMain.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeClientSitePageSectionLoudMain(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      webAssetImport: "webAssetImport",
      selectionId: uuidv4(),
      selectionType: SelectionTypeEnum.BUILT_IN,
    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.pageId).toEqual(pageId)
    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(upsertOne.data.dataValues.selectionId).not.toBeNull()
    expect(upsertOne.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)

  })

  test("getOneById: can get record by id.", async () => {
    const loud = makeClientSitePageSectionLoudMain(d)

    const getOneById = await loud.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeClientSitePageSectionLoudMain(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.webAssetImport).toEqual("webAssetImport")
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeClientSitePageSectionLoudMain(d)

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

