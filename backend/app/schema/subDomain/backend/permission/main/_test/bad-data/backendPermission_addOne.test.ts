import makeBackendPermissionMain from "../../backendPermission.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("backendPermission_addOne_error0001: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addOne = await backendPermissionMain.addOne({
      name: null
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendPermission_addOne_error0001")
  })

  test("backendPermission_addOne_error0002: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addOne = await backendPermissionMain.addOne({
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendPermission_addOne_error0002")
  })

  test("backendPermission_addOne_error0003: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    await backendPermissionMain.addOne({
      name: "testing name is taken."
    })

    const addOne = await backendPermissionMain.addOne({
      name: "testing name is taken.",
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendPermission_addOne_error0003")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})