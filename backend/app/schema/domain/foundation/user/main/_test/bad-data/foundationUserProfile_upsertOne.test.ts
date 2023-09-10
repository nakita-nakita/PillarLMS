import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import makeFoundationUserProfileMain from "../../foundationUserProfile.main";
jest.setTimeout(100000)


describe("test foundationUserProfile.main.js upsertOne with bad data.", () => {
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

  test("foundationUserProfile_upsertOne_error0001: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const upsertOne = await userProfileMain.upsertOne({
      id: ""
    })

    expect(upsertOne.success).toBe(false)
    expect(upsertOne.errorIdentifier).toEqual("foundationUserProfile_upsertOne_error0001")
  })

  test("foundationUserProfile_upsertOne_error0002: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const upsertOne = await userProfileMain.upsertOne({
      id: "This is a UUID"
    })

    expect(upsertOne.success).toBe(false)
    expect(upsertOne.errorIdentifier).toEqual("foundationUserProfile_upsertOne_error0002")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})