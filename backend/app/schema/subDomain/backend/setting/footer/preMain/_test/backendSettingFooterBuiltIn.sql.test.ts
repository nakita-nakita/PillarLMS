import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingFooterBuiltInSql from "../backendSettingFooterBuiltIn.sql";
jest.setTimeout(100000)

// ================================================================
// this datatable is seeded


describe("test backendSettingFooterBuiltIn.sql.js", () => {
  let d: dependencies
  let seedId = "5ce91223-9685-4ee7-93c2-6e38bae8804f"

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getOne: can get record.", async () => {
    const settingFooterBuiltIn = makeBackendSettingFooterBuiltInSql(d)

    const getOne = await settingFooterBuiltIn.getMany()

    expect(getOne.data.length).toBeGreaterThan(0)
  })

  test("getOneById: can get one record.", async () => {
    const settingFooterBuiltIn = makeBackendSettingFooterBuiltInSql(d)

    const getOneById = await settingFooterBuiltIn.getOneById({
      id: seedId,
    })

    expect(getOneById.data.dataValues.id).toEqual(seedId)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

