import makeBackendSiteDesignerSettingMain from "../../backendSiteDesignerSetting.main";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendSiteDesignerSetting.sql.js", () => {
  let d: dependencies;

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("updateOne & getOne: can update and get record.", async () => {
    const siteDesignerSettingSql = makeBackendSiteDesignerSettingMain(d)

    const updateOne = await siteDesignerSettingSql.updateOne({
      canAllRead: true,
      canAllUpdate: true,
    })
    expect(updateOne.success).toBe(true)
    expect(updateOne.data.dataValues.canAllRead).toBe(true)
    expect(updateOne.data.dataValues.canAllUpdate).toBe(true)

    const getOne = await siteDesignerSettingSql.getOne()
    expect(getOne.success).toBe(true)
    expect(getOne.data.dataValues.canAllRead).toBe(true)
    expect(getOne.data.dataValues.canAllUpdate).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

