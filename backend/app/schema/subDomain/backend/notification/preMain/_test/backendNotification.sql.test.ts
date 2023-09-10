import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../../../user/preMain/backendUser.sql";
import makeBackendNotificationSql from "../backendNotification.sql";
import { v4 as uuidv4 } from "uuid"
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
// import makeBackendNotificationSql from "../backendNotification.sql"
jest.setTimeout(100000)


describe("test backendNotification.sql.js", () => {
  let d: d_sub
  let recordId: string
  let userId: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomaintransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction: subDomaintransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const backendUserSql = makeBackendUserSql({
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomaintransaction,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    })

    let uuid = uuidv4();

    const user = (await backendUserSql.addOne({
      id: uuid
    })).data


    userId = user.dataValues.id

  }, 100000)

  test("addOne: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const addOne = await notificationSql.addOne({
      userId,
      message: "Cool message!",
      type: "SYSTEM",
      url: "asdf",
    })
    recordId = addOne.data.dataValues.id
    expect(addOne.data.dataValues.message).toEqual("Cool message!")
  })

  test("getOneById: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const getNotification = await notificationSql.getOneById({
      id: recordId,
    })
    expect(getNotification.data.dataValues.message).toEqual("Cool message!")
  })

  test("updateOne: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const updateNotification = await notificationSql.updateOne({
      id: recordId,
      message: "Cool message notifications!",
      type: "SYSTEM",
      url: "asdf",
    })
    expect(updateNotification.data.dataValues.message).toEqual("Cool message notifications!")
  })

  test("deleteOne: backendNotification can delete record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const deletedNotification = await notificationSql.deleteOne({
      id: recordId,
    })

    expect(deletedNotification.success).toBe(true)
  })

  // test("doYouHaveNewNotifications", async () => {

  //   const notificationSql = makeBackendNotificationSql(d)

  //   const deletedNotification = await notificationSql.doYouHaveNewNotifications({
  //     userId,
  //     // id: recordId,
  //   })

  //   expect(deletedNotification.success).toBe(true)
  // })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})

