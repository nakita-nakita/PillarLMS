import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain, d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserMain from "../../backendUser.main";

jest.setTimeout(100000)

describe("test backendUser.main.js", () => {
  let d: d_allDomain
  let recordId;

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt,
      ]
    };

  }, 100000)

  test("addOne: backendUsers can add record.", async () => {
    const userMain = makeBackendUserMain(d)

    const newUser = await userMain.addOne({
      email: "test@thisDomainnotreal.com",
      password: "asdfASDF1!",
      username: "test user name should never be used fefk123!@#!@#$J!@$J@",
      isAdmin: true,
    })
    recordId = newUser.data.id
    expect(newUser.data.email).toBe("test@thisDomainnotreal.com")
    // expect(newUser.data.username).toBe("test user name should never be used fefk123!@#!@#$J!@$J@")
    expect(newUser.data.isAdmin).toBe(true)
  })

  test("getOneById: backendUsers can get record.", async () => {
    const userMain = makeBackendUserMain(d)

    const getOneById = await userMain.getOneById({
      id: recordId,
    })
    expect(getOneById.data.dataValues.id).toBe(recordId)
    expect(getOneById.data.dataValues.isAdmin).toBe(true)
  })

  test("updateOne: backendUsers can update record.", async () => {
    const userMain = makeBackendUserMain(d)

    const updateUser = await userMain.updateOne({
      id: recordId,
      isAdmin: false,
    })
    expect(updateUser.data.dataValues.id).toBe(recordId)
    expect(updateUser.data.dataValues.isAdmin).toBe(false)
  })

  test("deleteOne: backendUsers can delete record.", async () => {
    const userMain = makeBackendUserMain(d)

    const deletedUser = await userMain.deleteOne({
      id: recordId,
    })

    expect(deletedUser.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

