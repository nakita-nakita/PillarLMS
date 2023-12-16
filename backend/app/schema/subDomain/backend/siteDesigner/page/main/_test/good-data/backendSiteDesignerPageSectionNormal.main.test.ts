import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageMain from "../../backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageSectionNormalMain from "../../backendSiteDesignerPageSectionNormal.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerPageSectionNormal.main.js", () => {
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

  test("addOne: can add record.", async () => {
    const normal = makeBackendSiteDesignerPageSectionNormalMain(d)

    const addOne = await normal.addOne({
      pageId,
      name: "name",
      selectionId: "f3c9ba04-9e0e-49ac-967e-e001eaecc1e6",
      selectionType: SelectionTypeEnum.BUILT_IN,
      orderNumber: 1,
      userAnswersJsonB: JSON.stringify({ testing: "testing" }),
      isReady: true,
    })
    record1Id = addOne.data.dataValues.id

    expect(addOne.data.dataValues.pageId).toEqual(pageId)
    expect(addOne.data.dataValues.selectionId).toEqual("f3c9ba04-9e0e-49ac-967e-e001eaecc1e6")
    expect(addOne.data.dataValues.name).toEqual("name")
    expect(addOne.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(addOne.data.dataValues.orderNumber).toEqual(1)
    expect(addOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(addOne.data.dataValues.isReady).toBe(true)
    expect(addOne.data.dataValues.menuJsonB).not.toBeUndefined()
    expect(addOne.data.dataValues.webAssetImport).not.toBeUndefined()
  })

  test("getOneByPageId: can get record.", async () => {
    const normal = makeBackendSiteDesignerPageSectionNormalMain(d)

    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.selectionId).toEqual("f3c9ba04-9e0e-49ac-967e-e001eaecc1e6")
    expect(getOneById.data.dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(getOneById.data.dataValues.orderNumber).toEqual(1)
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOneById.data.dataValues.isReady).toBe(true)
    expect(getOneById.data.dataValues.menuJsonB).not.toBeUndefined()
    expect(getOneById.data.dataValues.webAssetImport).not.toBeUndefined()
  })

  test("getOneByPageId: can get record.", async () => {
    const normal = makeBackendSiteDesignerPageSectionNormalMain(d)

    const getManyByPageId = await normal.getManyByPageId({
      pageId,
    })

    expect(getManyByPageId.data[0].dataValues.selectionId).toEqual("f3c9ba04-9e0e-49ac-967e-e001eaecc1e6")
    expect(getManyByPageId.data[0].dataValues.selectionType).toEqual(SelectionTypeEnum.BUILT_IN)
    expect(getManyByPageId.data[0].dataValues.orderNumber).toEqual(1)
    expect(getManyByPageId.data[0].dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getManyByPageId.data[0].dataValues.isReady).toBe(true)
  })


  test("updateOne: can add record.", async () => {
    const normal = makeBackendSiteDesignerPageSectionNormalMain(d)

    const updateOne = await normal.updateOne({
      id: record1Id,
      orderNumber: 2,
      userAnswersJsonB: JSON.stringify({ testing: "testing3" }),
      isReady: false,
    })

    expect(updateOne.data.dataValues.orderNumber).toEqual(2)
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing3" }))
    expect(updateOne.data.dataValues.isReady).toBe(false)

    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data.dataValues.orderNumber).toEqual(2)
    expect(getOneById.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing3" }))
    expect(getOneById.data.dataValues.isReady).toBe(false)
  })

  test("deleteOne: can delete record.", async () => {
    const normal = makeBackendSiteDesignerPageSectionNormalMain(d)

    const deleteOne = await normal.deleteOne({
      id: record1Id,
    })

    expect(deleteOne.success).toBe(true)

    const getOneById = await normal.getOneById({
      id: record1Id,
    })

    expect(getOneById.data).toBeNull()
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

