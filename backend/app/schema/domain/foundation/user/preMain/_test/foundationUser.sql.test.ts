import makeFoundationUserSql from "../foundationUser.sql"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
jest.setTimeout(100000)

describe("test foundationUser.logic.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("getManyWithPagination: db foundationUsers no user seed for empty database.", async () => {
    const userSql = makeFoundationUserSql(d)

    const users = await userSql.getManyWithPagination({})

    expect(users.data.rows.length).toEqual(0)
  })

  test("addOne: foundationUsers can add record.", async () => {
    const userSql = makeFoundationUserSql(d)

    const newUser = await userSql.addOne({
      email: "cool@user.com",
      password: "blahblahblah",
    })
    recordId = newUser.data.dataValues.id
    expect(newUser.data.dataValues.email).toEqual("cool@user.com")
  })

  test("getOne: foundationUsers can get record.", async () => {
    const userSql = makeFoundationUserSql(d)

    const getUser = await userSql.getOneById({
      id: recordId,
    })
    expect(getUser.data.dataValues.email).toEqual("cool@user.com")
  })

  test("updateOne: foundationUsers can add record.", async () => {
    const userSql = makeFoundationUserSql(d)

    const updateUser = await userSql.updateOne({
      id: recordId,
      email: "fun.and.cool@user.com",
    })
    expect(updateUser.data.dataValues.email).toEqual("fun.and.cool@user.com")
  })

  test("deactivateOne: foundationUsers can be deactivated.", async () => {
    const userSql = makeFoundationUserSql(d)

    const deactivatedUser = await userSql.deactivateOne({
      id: recordId,
    })

    expect(deactivatedUser.success).toBe(true)
    expect(deactivatedUser.data.isDeactivated).toBe(true)
  })

  test("reactivateOne: foundationUsers can be reactivated.", async () => {
    const userSql = makeFoundationUserSql(d)

    const reactivatedUser = await userSql.reactivateOne({
      id: recordId,
    })

    expect(reactivatedUser.success).toBe(true)
    expect(reactivatedUser.data.isDeactivated).toBe(false)
  })

  test("addMany: foundationUsers can add many records at once.", async () => {
    const userSql = makeFoundationUserSql(d)

    const addManyUsers = await userSql.addMany([
      {
        email: "another.cool.user@user.com",
        password: "blahblahblah",
      }
    ])
    expect(addManyUsers.success).toEqual(true)
})

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})

