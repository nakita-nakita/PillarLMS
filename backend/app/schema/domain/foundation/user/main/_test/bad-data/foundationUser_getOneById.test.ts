import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import makeFoundationUserMain from "../../foundationUser.main";
jest.setTimeout(100000)


describe("test foundationUser.main.js with bad data.", () => {
  let d: d_domain

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

  test("foundationUser_getOneById_error0001: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0001")
  })

  test("foundationUser_getOneById_error0002: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0002")
  })

  test("foundationUser_getOneById_error0003: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0003")
  })
  
  afterAll(async () => {
    await d.transaction.rollback();
  })
})