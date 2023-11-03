import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../../../../role/main/backendRoleManyPermission.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let roleId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleMain = makeBackendRoleMain(d)

    const role = await roleMain.addOne({ name: "test role for roleManyPermission. 1" })

    roleId = role.data.dataValues.id

  }, 100000)

  test("backendRoleManyPermission_getAll_error0001: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getAll = await backendRoleManyPermissionMain.getAll({
      roleId: null,
    })

    expect(getAll.success).toBe(false)
    expect(getAll.errorIdentifier).toEqual("backendRoleManyPermission_getAll_error0001")
  })

  test("backendRoleManyPermission_getAll_error0002: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getAll = await backendRoleManyPermissionMain.getAll({
      roleId: "I am a UUID",
    })

    expect(getAll.success).toBe(false)
    expect(getAll.errorIdentifier).toEqual("backendRoleManyPermission_getAll_error0002")
  })

  test("backendRoleManyPermission_getAll_error0003: works", async () => {
    const backendRoleManyPermissionMain = makeBackendRoleManyPermissionMain(d)

    const getAll = await backendRoleManyPermissionMain.getAll({
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(getAll.success).toBe(false)
    expect(getAll.errorIdentifier).toEqual("backendRoleManyPermission_getAll_error0003")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})