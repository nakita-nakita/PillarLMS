import makeBackendSettingFooterMain from "../../backendSettingFooter.main"
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
jest.setTimeout(100000)


describe("test backendSettingFooter.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const footer = makeBackendSettingFooterMain(d)

    const updateOne = await footer.upsertOne({
      userAnswers: JSON.stringify({ testing: "testing" }),
      selectionType: SelectionTypeEnum.BUILT_IN,
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      isReady: true,
    })

    
    expect(updateOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("built-in/footers/lite/Entry")
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const footer = makeBackendSettingFooterMain(d)

    const getOne = await footer.getOne()

    expect(getOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.webAssetImport).toEqual("built-in/footers/lite/Entry")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

