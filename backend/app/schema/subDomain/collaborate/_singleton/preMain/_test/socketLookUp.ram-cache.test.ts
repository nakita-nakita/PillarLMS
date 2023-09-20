import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeSocketLookUp from "../socketLookUp.ram-cache";
import { CallByTypeEnum } from "../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
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


  }, 100000)

  test("singleton: test adding one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.set({
        socket: {fakeSocket: true},
        socketId: "testSocketId",
        userId: "testUserId",
    })

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
  })

  test("singleton: test get one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.get()

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
  })

  test("singleton: test update one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    await lookUp.updateBySocketId({
      socketId: "testSocketId",
      isTabFocus: true,
      callByType: CallByTypeEnum.FIRST_NAME,
      firstName: "firstname1",

    })

    const result = await lookUp.get()

    expect(result.data[0]["socketId"]).toBe("testSocketId")
    expect(result.data[0]["userId"]).toBe("testUserId")
    expect(result.data[0].isTabFocus).toEqual(true)
  })
  
  test("singleton: test getUsernameForSocket.", async () => {
    const lookUp = makeSocketLookUp(d)

    const result = await lookUp.getUsernameForSocket({
      socketId: "testSocketId",
    })

    expect(result.data).toBe("firstname1")
  })

  test("singleton: test remove one lookup.", async () => {
    const lookUp = makeSocketLookUp(d)

    await lookUp.removeBySocketId({
      socketId: "testSocketId"
    })

    const result = await lookUp.get()

    expect(result.data.length).toEqual(0)
  })



  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

