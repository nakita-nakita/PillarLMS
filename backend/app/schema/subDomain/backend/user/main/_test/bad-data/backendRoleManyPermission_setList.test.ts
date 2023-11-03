import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../../../../role/main/backendRoleManyPermission.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let roleId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleMain = makeBackendRoleMain(d)

    const role = await roleMain.addOne({ name: "test role for roleManyPermission_setList. 1" })

    roleId = role.data.dataValues.id

  }, 100000)

  test("backendRoleManyPermission_setList_error0001: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await backendRoleManyPermissionMain.setList([
      {
        roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
        permissionId: null,
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendRoleManyPermission_setList_error0001")
  })

  test("backendRoleManyPermission_setList_error0002: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await backendRoleManyPermissionMain.setList([
      {
        roleId: null,
        permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendRoleManyPermission_setList_error0002")
  })

  test("backendRoleManyPermission_setList_error0003: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await backendRoleManyPermissionMain.setList([
      {
        roleId: "I am a UUID",
        permissionId: "I am a UUID",
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendRoleManyPermission_setList_error0003")
  })

  test("backendRoleManyPermission_setList_error0004: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await backendRoleManyPermissionMain.setList([
      {
        roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
        permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendRoleManyPermission_setList_error0004")
  })

  test("backendRoleManyPermission_setList_error0005: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const setList = await backendRoleManyPermissionMain.setList([
      {
        roleId,
        permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      }
    ])

    expect(setList.success).toBe(false)
    expect(setList.errorIdentifier).toEqual("backendRoleManyPermission_setList_error0005")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})