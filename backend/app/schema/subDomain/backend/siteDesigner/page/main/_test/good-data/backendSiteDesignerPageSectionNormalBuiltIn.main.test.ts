import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSectionNormalBuiltInMain from "../../backendSiteDesignerPageSectionNormalBuiltIn.main";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test C.main.js", () => {
  let d: dependencies
  let seedId = "06ff77c2-9488-402e-aa8a-8b9afb683147"

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getMany: can get many records.", async () => {
    const settingHeaderBuiltIn = makeBackendSiteDesignerPageSectionNormalBuiltInMain(d)

    const getMany = await settingHeaderBuiltIn.getMany()

    expect(getMany.data.length).toBeGreaterThan(0)
  })

  test("getOneById: can get one record.", async () => {
    const settingHeaderBuiltIn = makeBackendSiteDesignerPageSectionNormalBuiltInMain(d)

    const getOneById = await settingHeaderBuiltIn.getOneById({
      id: seedId,
    })

    expect(getOneById.data.dataValues.id).toEqual(seedId)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

