import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeSingleton from "../_singleton.ram-cache";
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

  test("singleton: test adding one property.", async () => {
    const singleton = makeSingleton(d)

    const result = await singleton.set({
        key: "key",
        location: "location",
        value: "value",
    })

    expect(result.data["location"]["key"]).toBe("value")
  })

  test("singleton: test getting one property.", async () => {
    const singleton = makeSingleton(d)

    const result = await singleton.get()

    expect(result.data["location"]["key"]).toBe("value")
  })

  test("singleton: test removing one property.", async () => {
    const singleton = makeSingleton(d)

    const result = await singleton.remove({
        location: "location",
        key: "key",
    })

    expect(result.data.location?.key).toBe(undefined)
  })
  
  // I can not test destroy because it will mess with other test.
  
//   test("singleton: test destroy", async () => {
//     const singleton = makeSingleton(d)

//     const result = await singleton.destory()

//     expect(result.data?.location).toBe(undefined)
//   })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

