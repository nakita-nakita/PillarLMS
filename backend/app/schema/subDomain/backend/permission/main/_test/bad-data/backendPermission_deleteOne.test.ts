import makeBackendPermissionMain from "../../backendPermission.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendPermission.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("backendPermission_deleteOne_error0001: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: ""
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0001")
  })

  test("backendPermission_deleteOne_error0002: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: "This is a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0002")
  })

  test("backendPermission_deleteOne_error0003: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0003")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})