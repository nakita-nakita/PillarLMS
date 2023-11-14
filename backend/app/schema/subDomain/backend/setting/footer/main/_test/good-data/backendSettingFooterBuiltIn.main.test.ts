import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingFooterBuiltInMain from "../../backendSettingFooterBuiltIn.main";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test backendSettingFooterBuiltIn.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getOne: can get record.", async () => {
    const settingFooterBuiltIn = makeBackendSettingFooterBuiltInMain(d)

    const getOne = await settingFooterBuiltIn.getMany()

    expect(getOne.data.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

