import makeSingleton from "../_singleton.ram-cache";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test collaborateSamePage.main.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

