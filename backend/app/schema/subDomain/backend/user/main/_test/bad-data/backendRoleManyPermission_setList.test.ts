import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendPermissionSql from "../../../../permission/preMain/backendPermission.sql";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../../../../role/main/backendRoleManyPermission.main";
// import makeBackendRoleMain from "../../backendRole.main";
// import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: d_sub
  let roleId: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

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
    await d.subDomainTransaction.rollback();
  })
})