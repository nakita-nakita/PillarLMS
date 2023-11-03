import makeBackendPermissionSql from "../backendPermission.sql"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendPermission.sql.js", () => {
  let d: dependencies;
  let recordId: string;

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getManyWithPagination: works.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const permissions = await permissionSql.getManyWithPagination({})
    expect(permissions.success).toEqual(true);
  })

  test("addOne: backendPermissions can add record.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const permission = await permissionSql.addOne({
      name: "Cool Permission!",
    })
    recordId = permission.data.dataValues.id
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission!")
  })

  test("getOneById: backendPermissions can get record.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const permission = await permissionSql.getOneById({
      id: recordId,
    })
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission!")
  })

  test("updateOne: backendPermissions can update record.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const permission = await permissionSql.updateOne({
      id: recordId,
      name: "Cool Permission Updated!",
    })
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission Updated!")
  })

  test("deleteOne: backendPermissions can delete record.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const deletedPermission = await permissionSql.deleteOne({
      id: recordId,
    })

    expect(deletedPermission.success).toBe(true)
  })

  test("addMany: backendPermissions can add many records at once.", async () => {
    const permissionSql = makeBackendPermissionSql(d)

    const addManyPermissions = await permissionSql.addMany({
      permissionNamesArray: [
        {
          name: "blah1",
        },
        {
          name: "blah2",
        },
        {
          name: "blah3",
        },
      ],
    })
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah1").length).toBe(1)
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah2").length).toBe(1)
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah3").length).toBe(1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

