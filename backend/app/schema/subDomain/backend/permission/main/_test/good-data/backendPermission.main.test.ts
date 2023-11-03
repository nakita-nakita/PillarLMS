import makeBackendPermissionMain from "../../backendPermission.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

jest.setTimeout(100000)

describe("test backendPermission.main.js", () => {
  let d: dependencies;
  let recordId: string;

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getManyWithPagination: works.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const permissions = await permissionMain.getManyWithPagination({})
    expect(permissions.success).toEqual(true);
  })

  test("addOne: backendPermissions can add record.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const permission = await permissionMain.addOne({
      name: "Cool Permission!",
    })
    recordId = permission.data.dataValues.id
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission!")
  })

  test("getOneById: backendPermissions can get record.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const permission = await permissionMain.getOneById({
      id: recordId,
    })
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission!")
  })

  test("updateOne: backendPermissions can update record.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const permission = await permissionMain.updateOne({
      id: recordId,
      name: "Cool Permission Updated!",
    })
    expect(permission.success).toEqual(true);
    expect(permission.data.dataValues.name).toEqual("Cool Permission Updated!")
  })

  test("deleteOne: backendPermissions can delete record.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deletedPermission = await permissionMain.deleteOne({
      id: recordId,
    })

    expect(deletedPermission.success).toBe(true)
  })

  test("addMany: backendPermissions can add many records at once.", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const addManyPermissions = await permissionMain.addMany([
      {
        name: "blah1",
      },
      {
        name: "blah2",
      },
      {
        name: "blah3",
      },
    ])
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah1").length).toBe(1)
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah2").length).toBe(1)
    expect(addManyPermissions.data.filter(permission => permission.dataValues.name === "blah3").length).toBe(1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

