import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../backendPermission.main";

jest.setTimeout(100000)

describe("test backendPermission.main.js", () => {
  let d: d_sub;
  let recordId: string;

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const transaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };
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
    await d.transaction.rollback();
  })
})

