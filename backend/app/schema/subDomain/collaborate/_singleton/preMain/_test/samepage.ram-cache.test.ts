import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeSocketLookUp from "../socketLookUp.ram-cache";
import { CallByTypeEnum } from "../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import makeSamepage from "../samepage.ram-cache";
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
      socket: { fakeSocket: true, emit: () => {} },
      email: "test1@test.com",
      socketId: "testSocketId1",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => {} },
      email: "test2@test.com",
      socketId: "testSocketId2",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => {} },
      email: "test3@test.com",
      socketId: "testSocketId3",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: () => {} },
      email: "test3@test.com",
      socketId: "testSocketId4",
      userId: "testUserId3",
    })
  }, 100000)

  test("samepage: changing url.", async () => {

    const samepage = makeSamepage(d)

    await samepage.changeUrlForUser({
      socketId: "testSocketId3",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await samepage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(1)
  })

  test("samepage: two of the same users on one page will show one user.", async () => {

    const samepage = makeSamepage(d)

    await samepage.changeUrlForUser({
      socketId: "testSocketId4",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await samepage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(1)
  })

  test("samepage: two users on page", async () => {

    const samepage = makeSamepage(d)

    await samepage.changeUrlForUser({
      socketId: "testSocketId1",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await samepage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(2)
  })

  test("samepage: two of the same users on one page will show one user.", async () => {

    const samepage = makeSamepage(d)

    await samepage.changeUrlForUser({
      socketId: "testSocketId4",
      currentAsPath: "/test/test2",
      currentPathname: "/test/test2",
      oldAsPath: "/test/test",
      oldPathname: "/test/test",
    })

    const result = await samepage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(2)
    
    const result2 = await samepage.getAllUsersFromUrl({
      url: "/test/test2"
    })

    expect(result2.data.length).toBe(1)
  })
  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

