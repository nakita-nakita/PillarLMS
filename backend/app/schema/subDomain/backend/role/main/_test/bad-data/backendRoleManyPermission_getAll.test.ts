import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendPermissionSql from "../../../../permission/preMain/backendPermission.sql";
import makeBackendRoleMain from "../../backendRole.main";
import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: d_sub
  let roleId: string

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
    await d.transaction.rollback();
  })
})