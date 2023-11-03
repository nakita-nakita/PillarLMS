import makeBackendSiteDesignerPageMain from "../../backendSiteDesigner_page.main";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesigner_page.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("backendSiteDesigner_page_deleteOne_error0001: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const deleteOne = await pageMain.deleteOne({
      id: ""
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendSiteDesigner_page_deleteOne_error0001")
  })

  test("backendSiteDesigner_page_deleteOne_error0002: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const deleteOne = await pageMain.deleteOne({
      
      id: "This is a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendSiteDesigner_page_deleteOne_error0002")
  })

  test("backendSiteDesigner_page_deleteOne_error0003: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const deleteOne = await pageMain.deleteOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendSiteDesigner_page_deleteOne_error0003")
  })
  
  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})