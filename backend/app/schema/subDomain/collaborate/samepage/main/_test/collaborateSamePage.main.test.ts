import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import { CallByTypeEnum } from "../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import makeSocketLookUp from "../../../_singleton/preMain/socketLookUp.ram-cache";
import makeSamepage from "../../../_singleton/preMain/samepage.ram-cache";
import makeCollaborateSamePageMain from "../collaborateSamePage.main";
jest.setTimeout(100000)


describe("test collaborateSamePage.main.js", () => {
  let d: d_allDomain

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomainTransaction,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const lookUp = makeSocketLookUp(d)

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test1@test.com",
      socketId: "testSocketId1",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test2@test.com",
      socketId: "testSocketId2",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test3@test.com",
      socketId: "testSocketId3",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => { } },
      email: "test3@test.com",
      socketId: "testSocketId4",
      userId: "testUserId3",
    })
  }, 100000)

  test("samepage collab: get all users.", async () => {

    const samepage = makeSamepage(d)

    await samepage.changeUrlForUser({
      socketId: "testSocketId3",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const collabSamePage = makeCollaborateSamePageMain(d)

    const result = await collabSamePage.getAllUsersFromPage({
      url: "/test/test"
    })

    expect(result.data.total).toBe(1)
    expect(result.data.users.length).toBe(1)
  })


  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

