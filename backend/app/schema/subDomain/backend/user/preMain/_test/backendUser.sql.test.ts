import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../backendUser.sql"
import { v4 as uuidv4 } from "uuid"
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
jest.setTimeout(100000)


describe("test backendUser.sql.js", () => {
  let d: d_allDomain
  let recordId = uuidv4()

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("addOne: backendUsers can add record.", async () => {
    const userSql = makeBackendUserSql(d)

    const newUser = await userSql.addOne({
      id: recordId,
      isAdmin: true,
    })
    expect(newUser.data.dataValues.id).toEqual(recordId)
    expect(newUser.data.dataValues.isAdmin).toBe(true)
  })

  test("getOneById: backendUsers can get record.", async () => {
    const userSql = makeBackendUserSql(d)

    const getOneById = await userSql.getOneById({
      id: recordId,
    })
    expect(getOneById.data.dataValues.id).toEqual(recordId)
    expect(getOneById.data.dataValues.isAdmin).toBe(true)
  })

  test("updateOne: backendUsers can update record.", async () => {
    const userSql = makeBackendUserSql(d)

    const updateUser = await userSql.updateOne({
      id: recordId,
      isAdmin: false,
    })
    expect(updateUser.data.dataValues.id).toEqual(recordId)
    expect(updateUser.data.dataValues.isAdmin).toBe(false)
  })

  test("deleteOne: backendUsers can update record.", async () => {
    const userSql = makeBackendUserSql(d)

    const deletedUser = await userSql.deleteOne({
      id: recordId,
    })

    expect(deletedUser.success).toBe(true)
  })

  test("addMany: backendUsers can add many records at once.", async () => {
    const userSql = makeBackendUserSql(d)

    const addManyUsers = await userSql.addMany([
      {
        id: recordId,
        isAdmin: true,
      },
    ])
    expect(addManyUsers.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

