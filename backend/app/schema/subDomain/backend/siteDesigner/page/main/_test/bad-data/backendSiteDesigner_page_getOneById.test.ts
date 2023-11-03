import makeBackendSiteDesignerPageMain from "../../backendSiteDesigner_page.main";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendSiteDesigner_page.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("backendSiteDesigner_page_getOneById_error0001: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendSiteDesigner_page_getOneById_error0001")
  })

  test("backendSiteDesigner_page_getOneById_error0002: works", async () => {
    const pageMain = makeBackendSiteDesignerPageMain(d)

    const getOneById = await pageMain.getOneById({

      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendSiteDesigner_page_getOneById_error0002")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})