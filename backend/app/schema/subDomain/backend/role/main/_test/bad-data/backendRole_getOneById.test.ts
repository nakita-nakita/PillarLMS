import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
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

  test("backendRole_getOneById_error0001: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const getOneById = await roleMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendRole_getOneById_error0001")
  })

  test("backendRole_getOneById_error0002: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const getOneById = await roleMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendRole_getOneById_error0002")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})