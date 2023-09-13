import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendRoleMain from "../../backendRole.main";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
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

  test("backendRole_addOne_error0001: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: null
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0001")
  })

  test("backendRole_addOne_error0002: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    const addOne = await backendRoleMain.addOne({
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0002")
  })

  test("backendRole_addOne_error0003: works", async () => {
    const backendRoleMain = makeBackendRoleMain(d)

    await backendRoleMain.addOne({
      name: "testing name is taken."
    })

    const addOne = await backendRoleMain.addOne({
      name: "testing name is taken.",
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("backendRole_addOne_error0003")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})