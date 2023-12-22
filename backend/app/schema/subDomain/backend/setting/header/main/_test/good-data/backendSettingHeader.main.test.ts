import makeBackendSettingHeaderMain from "../../backendSettingHeader.main"
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
jest.setTimeout(100000)


describe("test backendSettingHeader.main.js", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const header = makeBackendSettingHeaderMain(d)

    const updateOne = await header.upsertOne({
      userAnswers: JSON.stringify({ testing: "testing" }),
      selectionType: SelectionTypeEnum.BUILT_IN,
      selectionId: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      isReady: true,
    })


    expect(updateOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("built-in/headers/lite/Entry")
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const header = makeBackendSettingHeaderMain(d)

    const getOne = await header.getOne()

    expect(getOne.data.dataValues.menuJsonB).not.toBeNull()
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({ testing: "testing" }))
    expect(getOne.data.dataValues.webAssetImport).toEqual("built-in/headers/lite/Entry")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

