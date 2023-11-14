import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingHeaderBuiltInMain from "../../backendSettingHeaderBuiltIn.main";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test backendSettingHeaderBuiltIn.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getMany: can get many records.", async () => {
    const settingHeaderBuiltIn = makeBackendSettingHeaderBuiltInMain(d)

    const getOne = await settingHeaderBuiltIn.getMany()

    expect(getOne.data.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

