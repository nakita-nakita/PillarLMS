import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import makeFoundationUserProfileMain from "../../foundationUserProfile.main";
jest.setTimeout(100000)


describe("test foundationUserProfile.main.js getOneById with bad data.", () => {
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

  test("foundationUserProfile_getOneById_error0001: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const getOneById = await userProfileMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUserProfile_getOneById_error0001")
  })

  test("foundationUserProfile_getOneById_error0002: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const getOneById = await userProfileMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUserProfile_getOneById_error0002")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})