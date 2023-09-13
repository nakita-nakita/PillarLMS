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
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      domainDb,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("foundationUser_reactivateOne_error0001: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const reactivateOne = await userMain.reactivateOne({
      id: ""
    })

    expect(reactivateOne.success).toBe(false)
    expect(reactivateOne.errorIdentifier).toEqual("foundationUser_reactivateOne_error0001")
  })

  test("foundationUser_reactivateOne_error0002: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const reactivateOne = await userMain.reactivateOne({
      id: "This is a UUID"
    })

    expect(reactivateOne.success).toBe(false)
    expect(reactivateOne.errorIdentifier).toEqual("foundationUser_reactivateOne_error0002")
  })

  test("foundationUser_reactivateOne_error0003: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const reactivateOne = await userMain.reactivateOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(reactivateOne.success).toBe(false)
    expect(reactivateOne.errorIdentifier).toEqual("foundationUser_reactivateOne_error0003")
  })
  
  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})