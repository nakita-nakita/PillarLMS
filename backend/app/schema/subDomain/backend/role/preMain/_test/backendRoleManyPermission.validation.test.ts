import makeBackendRoleManyPermissionSql from "../backendRoleManyPermission.sql"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import makeBackendRoleManyPermissionValidation from "../backendRoleManyPermission.validation"
import makeBackendRoleSql from "../backendRole.sql"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
jest.setTimeout(100000)

describe("test backendRoleManyPermission.validation.js", () => {
  let d: dependencies
  let recordId: string
  let roleId: string
  let permissionId: string
  // let recordName: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleSql = makeBackendRoleSql(d)
    const permissionSql = makeBackendPermissionSql(d)
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const role = await roleSql.addOne({
      name: "backend role many permission tested: role"
    })
    roleId = role.data.dataValues.id
    
    const permission = await permissionSql.addOne({
      name: "backend role many permission tested: permisison"
    })
    permissionId = permission.data.dataValues.id

    const roleManyPermission = await roleManyPermissionSql.addOne({
      permissionId,
      roleId,
    })
    recordId = roleManyPermission.data.dataValues.id
    // recordName = role.data.dataValues.name

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    const areIdsValid = await roleManyPermissionValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    const areIdsValid = await roleManyPermissionValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    const isIdValid = await roleManyPermissionValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    const isIdValid = await roleManyPermissionValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("doesRoleHavePermission: Yes", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    const doesRoleHavePermission = await roleManyPermissionValidation.doesRoleHavePermission({
      roleId,
      permissionId,
    })

    expect(doesRoleHavePermission.result).toBe(true);
  })

  test("doesRoleHavePermission: No", async () => {
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

    // target function for testing
    const doesRoleHavePermission = await roleManyPermissionValidation.doesRoleHavePermission({
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(doesRoleHavePermission.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})