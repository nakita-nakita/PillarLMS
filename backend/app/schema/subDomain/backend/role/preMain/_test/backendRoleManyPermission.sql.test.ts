import { Sequelize } from "sequelize-typescript"
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger"
import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import makeBackendRoleManyPermissionSql from "../backendRoleManyPermission.sql"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import makeBackendRoleSql from "../backendRole.sql"
jest.setTimeout(100000)


describe("test backendRoleManyPermission.sql.js", () => {
  let d: d_sub;
  let roleId: string

  let permissionId_1: string
  let permissionId_2: string
  let permissionId_3: string
  let permissionId_4: string

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

    const roleSql = makeBackendRoleSql(d)
    const permissionSql = makeBackendPermissionSql(d)

    const role = await roleSql.addOne({ name: "test role for roleManyPermission. 1" })
    const permission_1 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 1" })
    const permission_2 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 2" })
    const permission_3 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 3" })
    const permission_4 = await permissionSql.addOne({ name: "test permission for roleManyPermission. 4" })

    roleId = role.data.dataValues.id
    permissionId_1 = permission_1.data.dataValues.id
    permissionId_2 = permission_2.data.dataValues.id
    permissionId_3 = permission_3.data.dataValues.id
    permissionId_4 = permission_4.data.dataValues.id

  }, 100000)

  test("addOne: add one permission to role.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const addOnePermission = await roleManyPermissionSql.addOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(addOnePermission.success).toBe(true);
  })

  test("deleteOne: delete one permission from role.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    //target function
    const deleteOnePermission = await roleManyPermissionSql.deleteOne({
      roleId,
      permissionId: permissionId_1,
    })

    expect(deleteOnePermission.success).toBe(true);
  })

  test("addMany: add many permissions to role.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    //target function
    const addManyPermission = await roleManyPermissionSql.addMany([
      {
        permissionId: permissionId_1,
        roleId,
      }, {
        permissionId: permissionId_2,
        roleId,
      },
    ])

    expect(addManyPermission.success).toBe(true);
  })

  test("deleteMany: delete many permissions from a role.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const deleteManyPermission = await roleManyPermissionSql.deleteMany([
      {
        permissionId: permissionId_1,
        roleId,
      }, {
        permissionId: permissionId_2,
        roleId,
      },
    ])

    expect(deleteManyPermission.success).toBe(true);
  })

  test("setList: first time.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const setList = await roleManyPermissionSql.setList([
      {
        permissionId: permissionId_1,
        roleId: roleId,
      }
    ])


    expect(setList.success).toBe(true)
  })

  test("getAll: setList worked", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const getAll = await roleManyPermissionSql.getAll({
      roleId,
    })

    expect(getAll.success).toBe(true)
    expect(getAll.data.length).toBe(1)
  })

  test("setList & getAll: can update and get record.", async () => {
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d)

    const getAll = await roleManyPermissionSql.getAll({
      roleId,
    })

    const setList = await roleManyPermissionSql.setList([
      ...getAll.data.map(l => l.dataValues),
      {
        permissionId: permissionId_2,
        roleId: roleId
      },
      {
        permissionId: permissionId_3,
        roleId: roleId
      },
      {
        permissionId: permissionId_4,
        roleId: roleId
      },
    ])

    expect(setList.success).toEqual(true)

    const getAllAgain = await roleManyPermissionSql.getAll({
      roleId,
    })

    expect(getAllAgain.success).toBe(true)
    expect(getAllAgain.data.length).toBe(4)
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})

