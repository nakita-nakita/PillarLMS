import makeBackendRoleMain from "../../backendRole.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("backendRole_addOne_error0001: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: null
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0001")
  })

  test("backendRole_addOne_error0002: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0002")
  })

  test("backendRole_addOne_error0003: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    await backendRoleMain.addOne({
      name: "testing name is taken."
    })

    const addOne = await backendRoleMain.addOne({
      name: "testing name is taken.",
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0003")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})