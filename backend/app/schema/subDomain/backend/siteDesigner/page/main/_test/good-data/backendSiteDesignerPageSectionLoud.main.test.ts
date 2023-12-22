import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageMain from "../../backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageSectionLoudMain from "../../backendSiteDesignerPageSectionLoud.main";
jest.setTimeout(100000)


describe("test backendSiteDesignerPageSectionLoud.main.js", () => {
  let d: dependencies
  let pageId: string
  let record1Id: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageMain = makeBackendSiteDesignerPageMain(d)

    const page = await pageMain.addOne({
      slug: "/test/this-is-test/should-not-be-saved",
    })

    pageId = page.data.dataValues.id

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudMain(d)

    const upsertOne = await loud.upsertOne({
      pageId,
      selectionId: "a3cf9afa-262a-4c82-b290-f35e6eafca9d",
      selectionType: SelectionTypeEnum.BUILT_IN,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      isReady: true,
    })
    record1Id = upsertOne.data.dataValues.id

    expect(upsertOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(upsertOne.data.dataValues.isReady).toBe(true)
    expect(upsertOne.data.dataValues.name).toBe('Gif/Image Intro')
    expect(upsertOne.data.dataValues.author).toBe('built-in')
    expect(upsertOne.data.dataValues.selectionId).toBe("a3cf9afa-262a-4c82-b290-f35e6eafca9d")
    expect(upsertOne.data.dataValues.selectionType).toBe(SelectionTypeEnum.BUILT_IN)
    expect(upsertOne.data.dataValues.menuJsonB).not.toBeUndefined()
    expect(upsertOne.data.dataValues.webAssetImport).not.toBeUndefined()

  })

  test("getOneByPageId: can get record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudMain(d)

    const getOneByPageId = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneByPageId.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneByPageId.data.dataValues.isReady).toBe(true)
    expect(getOneByPageId.data.dataValues.menuJsonB).not.toBeUndefined()
    expect(getOneByPageId.data.dataValues.webAssetImport).not.toBeUndefined()
  })

  test("getMany: can get all records.", async () => {
    const pageMain = makeBackendSiteDesignerPageSectionLoudMain(d)

    const getMany = await pageMain.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("deleteOne: can delete record.", async () => {
    const loud = makeBackendSiteDesignerPageSectionLoudMain(d)

    const deleteOne = await loud.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneById = await loud.getOneByPageId({
      pageId,
    })

    expect(getOneById.data).toBeNull()
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

