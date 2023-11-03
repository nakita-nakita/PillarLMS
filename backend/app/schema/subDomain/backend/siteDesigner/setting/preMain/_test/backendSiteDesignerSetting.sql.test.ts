import makeBackendSiteDesignerSettingSql from "../backendSiteDesignerSetting.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerSetting.sql.js", () => {
  let d: dependencies;

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("updateOne & getOne: can update and get record.", async () => {
    const siteDesignerSettingSql = makeBackendSiteDesignerSettingSql(d)

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
    await d.subDomainTransaction.rollback();
  })
})

