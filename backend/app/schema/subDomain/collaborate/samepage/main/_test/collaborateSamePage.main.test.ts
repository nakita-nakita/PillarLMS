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
import makeCollaborateSamePageMain from "../collaborateSamePage.main";
import singletonCachingService from "../../../../../../singleton.ram-cache";
jest.setTimeout(100000)


describe("test collaborateSamePage.main.js", () => {
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
    // const redisClient = connectToRedis()
    const cacheService = singletonCachingService;

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomainTransaction,
      domainTransaction,
      cacheService,
      loggers: [
        console,
        throwIt,
      ]
    };

    const foundationUser = makeFoundationUserMain(d)
    const backendUserProfile = makeBackendUserProfileMain(d)

    user1 = (await foundationUser.addOne({
      email: "user11+collaboratesamepage@test.com",
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
      email: "user22+collaboratesamepage@test.com",
      password: "asdfASDF2!",
    })).data

    user2Profile = (await backendUserProfile.updateOne({
      id: user2.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#ff2",
      firstName: "firstname2",
      labelColor: "#002",
      lastName: "lastname2",
      picture: "picture2",
      username: "username2",
    })).data


    user3 = (await foundationUser.addOne({
      email: "user33+collaboratesamepage@test.com",
      password: "asdfASDF3!",
    })).data

    user3Profile = (await backendUserProfile.updateOne({
      id: user3.dataValues.id,
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#ff3",
      firstName: "firstname3",
      labelColor: "#003",
      lastName: "lastname3",
      picture: "picture3",
      username: "username3",
    })).data


  }, 100000)

  test("addUserToPage: test adding one user.", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.addUserToPage({
      url,
      userId: user1.dataValues.id,
    })

    expect(page.data.total).toEqual(1)
    expect(page.data.users[0].email).toEqual("user11+collaboratesamepage@test.com")
    expect(page.data.users[0].id).toEqual(user1.dataValues.id)
    expect(page.data.users[0].callByType).toEqual(CallByTypeEnum.EMAIL)
    expect(page.data.users[0].circleColor).toEqual("#fff")
    expect(page.data.users[0].firstName).toEqual("firstname1")
    expect(page.data.users[0].labelColor).toEqual("#000")
    expect(page.data.users[0].lastName).toEqual("lastname1")
    expect(page.data.users[0].picture).toEqual("picture1")
    expect(page.data.users[0].username).toEqual("username1")
  })

  test("getAllUsersFromPage: test adding get users.", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.getAllUsersFromPage({
      url,
    })

    expect(page.data.total).toEqual(1)
    expect(page.data.users[0].email).toEqual("user11+collaboratesamepage@test.com")
    expect(page.data.users[0].id).toEqual(user1.dataValues.id)
    expect(page.data.users[0].callByType).toEqual(CallByTypeEnum.EMAIL)
    expect(page.data.users[0].circleColor).toEqual("#fff")
    expect(page.data.users[0].firstName).toEqual("firstname1")
    expect(page.data.users[0].labelColor).toEqual("#000")
    expect(page.data.users[0].lastName).toEqual("lastname1")
    expect(page.data.users[0].picture).toEqual("picture1")
    expect(page.data.users[0].username).toEqual("username1")
  })


  test("addUserToPage 2nd time: test adding one user.", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.addUserToPage({
      url,
      userId: user2.dataValues.id,
    })

    expect(page.data.total).toEqual(2)
    expect(page.data.users[0].email).toEqual("user11+collaboratesamepage@test.com")
    expect(page.data.users[0].id).toEqual(user1.dataValues.id)
    expect(page.data.users[0].callByType).toEqual(CallByTypeEnum.EMAIL)
    expect(page.data.users[0].circleColor).toEqual("#fff")
    expect(page.data.users[0].firstName).toEqual("firstname1")
    expect(page.data.users[0].labelColor).toEqual("#000")
    expect(page.data.users[0].lastName).toEqual("lastname1")
    expect(page.data.users[0].picture).toEqual("picture1")
    expect(page.data.users[0].username).toEqual("username1")
  })

  test("addUserToPage: should still be two users after adding same users twice (two tabs).", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.addUserToPage({
      url,
      userId: user1.dataValues.id,
    })

    expect(page.data.total).toEqual(2)
  })

  test("removeUserFromPage: should still be two users after adding same users twice (two tabs).", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.removeUserFromPage({
      url,
      userId: user1.dataValues.id,
    })

    expect(page.data.total).toEqual(2)
  })

  test("removeUserFromPage: should be one user.", async () => {
    const samePage = makeCollaborateSamePageMain(d)

    const page = await samePage.removeUserFromPage({
      url,
      userId: user1.dataValues.id,
    })

    expect(page.data.total).toEqual(1)
  })


  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

