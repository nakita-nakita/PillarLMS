import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../../../../role/main/backendRoleManyPermission.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let roleId: string

  let permissionId_1: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleMain = makeBackendRoleMain(d)
    const permissionMain = makeBackendPermissionMain(d)
    const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d);

    const role = await roleMain.addOne({ name: "test role for roleManyPermission. 1" })
    const permission_1 = await permissionMain.addOne({ name: "test permission for roleManyPermission. 1" })

    roleId = role.data.dataValues.id
    permissionId_1 = permission_1.data.dataValues.id

  }, 100000)

  test("backendRoleManyPermission_deleteOne_error0001: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId: null,
      permissionId: null,
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0001")
  })

  test("backendRoleManyPermission_deleteOne_error0002: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId: null,
      permissionId: "I am a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0002")
  })

  test("backendRoleManyPermission_deleteOne_error0003: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId: null,
      permissionId: permissionId_1,
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0003")
  })

  test("backendRoleManyPermission_deleteOne_error0004: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId: "I am a UUID",
      permissionId: permissionId_1,
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0004")
  })

  test("backendRoleManyPermission_deleteOne_error0005: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId,
      permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0005")
  })

  test("backendRoleManyPermission_deleteOne_error0006: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      permissionId: permissionId_1,
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0006")
  })

  test("backendRoleManyPermission_deleteOne_error0007: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const deleteOne = await backendRoleManyPermissionMain.deleteOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRoleManyPermission_deleteOne_error0007")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})