import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import { v4 as uuidv4 } from "uuid"
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeFoundationUserMain from "../../../../../domain/foundation/user/main/foundationUser.main";
import makeBackendUserProfileMain from "../../../../backend/user/main/backendUserProfile.main";
import { CallByTypeEnum } from "../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import { Model } from "sequelize";
import foundationUser from "../../../../../../models/domain/foundation/user/foundationUser.model";
import foundationUserProfile from "../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import connectToRedis from "../../../../../../reddis";
import makeCollaborateSamePageCache from "../collaborateSamePage.cache";
jest.setTimeout(100000)


describe("test backendUser.sql.js", () => {
  let d: d_allDomain
  const url = "/fake/test/url"
  let user1: Model<foundationUser>
  let user1Profile: Model<foundationUserProfile>
  let user2: Model<foundationUser>
  let user2Profile: Model<foundationUserProfile>
  let user3: Model<foundationUser>
  let user3Profile: Model<foundationUserProfile>

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();
    const redisClient = connectToRedis()

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomainTransaction,
      domainTransaction,
      redisClient,
      loggers: [
        console,
        throwIt,
      ]
    };

    const foundationUser = makeFoundationUserMain(d)
    const backendUserProfile = makeBackendUserProfileMain(d)

    user1 = (await foundationUser.addOne({
      email: "user1+collaboratesamepage@test.com",
      password: "asdfASDF1!",
    })).data

    user1Profile = (await backendUserProfile.updateOne({
      id: user1.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#fff",
      firstName: "firstname1",
      labelColor: "#000",
      lastName: "lastname1",
      picture: "picture1",
      username: "username1",
    })).data

    user2 = (await foundationUser.addOne({
      email: "user2+collaboratesamepage@test.com",
      password: "asdfASDF2!",
    })).data

    user2Profile = (await backendUserProfile.updateOne({
      id: user1.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#fff",
      firstName: "firstname2",
      labelColor: "#000",
      lastName: "lastname2",
      picture: "picture2",
      username: "username2",
    })).data


    user3 = (await foundationUser.addOne({
      email: "user1+collaboratesamepage@test.com",
      password: "asdfASDF3!",
    })).data

    user3Profile = (await backendUserProfile.updateOne({
      id: user1.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#fff",
      firstName: "firstname3",
      labelColor: "#000",
      lastName: "lastname3",
      picture: "picture3",
      username: "username3",
    })).data


  }, 100000)

  test("addOne: backendUsers can add record.", async () => {
    const samePage = makeCollaborateSamePageCache(d)

    await samePage.addUserToPage({
      url,
      userId: user1.dataValues.id,
    })
    // expect(newUser.data.dataValues.id).toEqual(recordId)
    // expect(newUser.data.dataValues.isAdmin).toBe(true)
  })

  // test("getOneById: backendUsers can get record.", async () => {
  //   const userSql = makeBackendUserSql(d)

  //   const getOneById = await userSql.getOneById({
  //     id: recordId,
  //   })
  //   expect(getOneById.data.dataValues.id).toEqual(recordId)
  //   expect(getOneById.data.dataValues.isAdmin).toBe(true)
  // })

  // test("updateOne: backendUsers can update record.", async () => {
  //   const userSql = makeBackendUserSql(d)

  //   const updateUser = await userSql.updateOne({
  //     id: recordId,
  //     isAdmin: false,
  //   })
  //   expect(updateUser.data.dataValues.id).toEqual(recordId)
  //   expect(updateUser.data.dataValues.isAdmin).toBe(false)
  // })

  // test("deleteOne: backendUsers can update record.", async () => {
  //   const userSql = makeBackendUserSql(d)

  //   const deletedUser = await userSql.deleteOne({
  //     id: recordId,
  //   })

  //   expect(deletedUser.success).toBe(true)
  // })

  // test("addMany: backendUsers can add many records at once.", async () => {
  //   const userSql = makeBackendUserSql(d)

  //   const addManyUsers = await userSql.addMany([
  //     {
  //       id: recordId,
  //       isAdmin: true,
  //     },
  //   ])
  //   expect(addManyUsers.success).toBe(true)
  // })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

