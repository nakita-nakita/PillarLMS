import makeSocketLookUp from "../socketLookUp.ram-cache";
import makeWhoIsOnPage from "../whoIsOnPage.ram-cache";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test collaborateWhoIsOnPage.ram-cache.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

  test("whoIsOnPage: changing url.", async () => {

    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      socketId: "testSocketId3",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await whoIsOnPage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(1)
  })

  test("whoIsOnPage: two of the same users on one page will show one user.", async () => {

    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      socketId: "testSocketId4",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await whoIsOnPage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(1)
  })

  test("whoIsOnPage: two users on page", async () => {

    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      socketId: "testSocketId1",
      currentAsPath: "/test/test",
      currentPathname: "/test/test",
    })

    const result = await whoIsOnPage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(2)
  })

  test("whoIsOnPage: two of the same users on one page will show one user.", async () => {

    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      socketId: "testSocketId4",
      currentAsPath: "/test/test2",
      currentPathname: "/test/test2",
      oldAsPath: "/test/test",
      oldPathname: "/test/test",
    })

    const result = await whoIsOnPage.getAllUsersFromUrl({
      url: "/test/test"
    })

    expect(result.data.length).toBe(2)
    
    const result2 = await whoIsOnPage.getAllUsersFromUrl({
      url: "/test/test2"
    })

    expect(result2.data.length).toBe(1)
  })
  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

