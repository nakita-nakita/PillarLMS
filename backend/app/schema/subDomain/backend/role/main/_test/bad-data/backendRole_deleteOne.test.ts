import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendRoleMain from "../../backendRole.main";
jest.setTimeout(100000)

describe("test backendRole.main.js with bad data.", () => {
  let d: d_sub

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
  }, 100000)

  test("backendRole_deleteOne_error0001: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: ""
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error0001")
  })

  test("backendRole_deleteOne_error0002: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: "This is a UUID"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error0002")
  })

  test("backendRole_deleteOne_error0003: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.deleteOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_deleteOne_error0003")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})