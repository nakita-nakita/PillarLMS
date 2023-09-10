import { Sequelize } from "sequelize-typescript"
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb"
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger"
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types"
import makeBackendUserSql from "../../../user/preMain/backendUser.sql"
import makeBackendNotificationSql from "../backendNotification.sql"
import makeBackendNotificationValidation from "../backendNotification.validation"
import { v4 as uuidv4 } from "uuid"
import backendUser from "../../../../../../models/subDomain/backend/user/backendUser.model"
import { Model } from "sequelize"
// import makeBackendNotificationSql from "../backendNotification.sql"
// import makeBackendNotificationValidation from "../backendNotification.validation"
jest.setTimeout(100000)

describe("test backendNotification.validation.js", () => {
  let d: d_sub
  let recordId: string
  let userId: string
  let user: Model<backendUser>

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

    let uuid = uuidv4()
    const notificationSql = makeBackendNotificationSql(d)

    user = (await backendUserSql.addOne({
      id: uuid
    })).data

    // const subDomainDb: Sequelize = await emptyTestSubdomainDb()
    // const transaction = await subDomainDb.transaction()

    const notification = await notificationSql.addOne({
      message: "testing-blah-blah-1",
      type: "SYSTEM",
      url: "URL",
      userId: uuid,
    })

    recordId = notification.data.dataValues.id

    userId = user.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const areIdsValid = await notificationValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const areIdsValid = await notificationValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })
    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const isIdValid = await notificationValidation.isIdValid({
      id: recordId,
    })
    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const isIdValid = await notificationValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("hasBeenClick", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const hasBeenClick = await notificationValidation.hasBeenClick({
      id: recordId,
    })

    expect(hasBeenClick.success).toBe(true)
  })

  test("hasBeenSeen", async () => {
    const notificationValidation = makeBackendNotificationValidation(d)

    const hasBeenSeen = await notificationValidation.hasBeenSeen({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})