import { Sequelize } from "sequelize-typescript"
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import makeBackendRoleSql from "../backendRole.sql"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import makeBackendRoleValidation from "../backendRole.validation"
import makeBackendRoleManyPermissionSql from "../backendRoleManyPermission.sql"
jest.setTimeout(100000)

describe("test backendRole.validation.js", () => {
  let d: d_sub
  let recordId: string
  let recordName: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        // throwIt,
      ]
    };

    const roleSql = makeBackendRoleSql(d)

    const role = (await roleSql.addOne(
      {
        name: "blah1",
      })
    )

    recordId = role.data.dataValues.id
    recordName = role.data.dataValues.name

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("isNameTaken: Yes.", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const isNameTaken = await roleValidation.isNameTaken({
      name: recordName
    })

    expect(isNameTaken.result).toBe(true);
  })

  test("isNameTaken: No", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const isIdValid = await roleValidation.isNameTaken({
      name: "This is a fake name for a role.",
    })

    expect(isIdValid.result).toBe(false);
  })

  // test("doesRoleHavePermission: Yes", async () => {
  //   const roleValidation = makeBackendRoleValidation(d)
  //   const permissionSql = makeBackendPermissionSql(d)
  //   const roleSql = makeBackendRoleSql(d)
  //   const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

  //   //get ids
  //   const roles = await roleSql.getManyWithPagination({})
  //   const permission = await permissionSql.addOne({ name: "test permission for role many" })

  //   const permissionId = permission.data.dataValues.id
  //   const roleId = roles.data.rows[0].dataValues.id

  //   //save ids
  //   await roleManyPermissionSql.addOne({
  //     roleId,
  //     permissionId,
  //   })

  //   // target function for testing
  //   const doesRoleHavePermission = await roleValidation.doesRoleHavePermission({
  //     roleId,
  //     permissionId,
  //   })

  //   expect(doesRoleHavePermission.result).toBe(true);
  // })

  // test("doesRoleHavePermission: No", async () => {
  //   const roleValidation = makeBackendRoleValidation(d)

  //   // target function for testing
  //   const doesRoleHavePermission = await roleValidation.doesRoleHavePermission({
  //     roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
  //     permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
  //   })

  //   expect(doesRoleHavePermission.result).toBe(false);
  // })

  test("areNamesTaken: Yes.", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const isNameTaken = await roleValidation.areNamesTaken({
      nameArray: [recordName],
    })
    expect(isNameTaken.result).toBe(true);
  })

  test("areNamesTaken: No", async () => {
    const roleValidation = makeBackendRoleValidation(d)

    const areNamesTaken = await roleValidation.areNamesTaken({
      nameArray: ["This is a fake name."],
    })
    expect(areNamesTaken.result).toBe(false);
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})