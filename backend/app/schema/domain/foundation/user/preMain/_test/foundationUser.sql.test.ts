import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { Sequelize } from "sequelize-typescript"
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger"
import { d_domain } from "../../../../../utils/types/dependencyInjection.types"
import makeFoundationUserSql from "../foundationUser.sql"
jest.setTimeout(100000)

describe("test foundationUser.logic.js", () => {
  let d: d_domain
  let recordId: string

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const transaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      domainDb,
      transaction,
      loggers: [
        console,
        // throwIt,
      ]
    };
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
    await d.transaction.rollback();
  })
})

