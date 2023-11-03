import makeBackendUserMain from "../../backendUser.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendUser.main.js", () => {
  let d: dependencies
  let recordId;

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: backendUsers can add record.", async () => {
    const userMain = makeBackendUserMain(d)

    const newUser = await userMain.addOne({
      email: "test@thisDomainnotreal.com",
      password: "asdfASDF1!",
      username: "test user name should never be used fefk123!@#!@#$J!@$J@",
      isAdmin: true,
    })
    recordId = newUser.data.id
    expect(newUser.data.email).toBe("test@thisDomainnotreal.com")
    // expect(newUser.data.username).toBe("test user name should never be used fefk123!@#!@#$J!@$J@")
    expect(newUser.data.isAdmin).toBe(true)
  })

  test("getOneById: backendUsers can get record.", async () => {
    const userMain = makeBackendUserMain(d)

    const getOneById = await userMain.getOneById({
      id: recordId,
    })
    expect(getOneById.data.dataValues.id).toBe(recordId)
    expect(getOneById.data.dataValues.isAdmin).toBe(true)
  })

  test("updateOne: backendUsers can update record.", async () => {
    const userMain = makeBackendUserMain(d)

    const updateUser = await userMain.updateOne({
      id: recordId,
      isAdmin: false,
    })
    expect(updateUser.data.dataValues.id).toBe(recordId)
    expect(updateUser.data.dataValues.isAdmin).toBe(false)
  })

  test("deleteOne: backendUsers can delete record.", async () => {
    const userMain = makeBackendUserMain(d)

    const deletedUser = await userMain.deleteOne({
      id: recordId,
    })

    expect(deletedUser.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

