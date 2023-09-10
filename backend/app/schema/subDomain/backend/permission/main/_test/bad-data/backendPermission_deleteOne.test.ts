import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../backendPermission.main";
jest.setTimeout(100000)

describe("test backendPermission.main.js with bad data.", () => {
  let d: d_sub

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

  test("backendPermission_deleteOne_error0001: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: ""
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0001")
  })

  test("backendPermission_deleteOne_error0002: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: "This is a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0002")
  })

  test("backendPermission_deleteOne_error0003: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.deleteOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_deleteOne_error0003")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})