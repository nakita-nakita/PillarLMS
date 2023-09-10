import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeFoundationAuthFunc from "../foundationAuth.func";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
jest.setTimeout(100000)


describe("test backendRole.func.js", () => {
  let d: d_domain
  let token: any

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const transaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      domainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("signinToken: works.", async () => {
    const authFunc = makeFoundationAuthFunc(d)

    token = await authFunc.signinToken({
      userId: "userId",
    })

    expect(token.success).toEqual(true)
  })

  test("getDataFromToken: backendRoles can add record.", async () => {
    const authFunc = makeFoundationAuthFunc(d)

    const checkedToken = await authFunc.getDataFromToken({
      token: token.data,
    })
    
    expect(checkedToken.success).toEqual(true)
    expect(checkedToken.data.userId).toEqual("userId")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})

