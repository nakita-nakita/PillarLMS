import makeBackendSettingHeaderMain from "../../backendSettingHeader.main"
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
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
      menuJsonB: JSON.stringify({testing: "testing"}),
      userAnswersJsonB: JSON.stringify({testing: "testing"}),
      webAssetImport: "webAssetImport",
      isReady: true,
    })

    expect(updateOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(updateOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const header = makeBackendSettingHeaderMain(d)

    const getOne = await header.getOne()

    expect(getOne.data.dataValues.menuJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.userAnswersJsonB).toEqual(JSON.stringify({testing: "testing"}))
    expect(getOne.data.dataValues.webAssetImport).toEqual("webAssetImport")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

