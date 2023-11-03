import makeBackendSiteDesignerSettingReadAccessMain from "../../backendSiteDesignerSetting_readAccess.main";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerSetting_readAccess.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("backendSiteDesignerSetting_readAccess_setList_error0001: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList(null)

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0001")
  })


  test("backendSiteDesignerSetting_readAccess_setList_error0001: works, part 2", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0001")
  })

  test("backendSiteDesignerSetting_readAccess_setList_error0002: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([
      {
        userId: "I am a UUID"
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0002")
  })

  test("backendSiteDesignerSetting_readAccess_setList_error0003: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerSettingReadAccessMain(d)

    const setList = await pageTemplateMain.setList([
      {
        userId: "3a06e07e-0817-4800-83fb-3784d2ac585e"
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendSiteDesignerSetting_readAccess_setList_error0003")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})