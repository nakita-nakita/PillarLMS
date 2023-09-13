import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../backendPermission.main";
jest.setTimeout(100000)


describe("test backendPermission.main.js with bad data.", () => {
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

  test("backendPermission_getOneById_error0001: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const getOneById = await permissionMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendPermission_getOneById_error0001")
  })

  test("backendPermission_getOneById_error0002: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const getOneById = await permissionMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendPermission_getOneById_error0002")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})