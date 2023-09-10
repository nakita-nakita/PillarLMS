import { Sequelize } from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb"
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger"
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesigner_discussion.sql"
import makeBackendSiteDesignerDiscussionValidation from "../backendSiteDesigner_discussion.validation"
jest.setTimeout(100000)

describe("test backendRole.validation.js", () => {
  let d: d_sub
  let recordId: string

  beforeAll(async () => {
    const uuid = uuidv4()

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

    const userSql = makeBackendUserSql({
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

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const user = await userSql.addOne({
      id: uuid
    })

    const discussion = (await discussionSql.addOne(
      {
        post: "blah",
        title: "title",
        userId: user.data.dataValues.id
      })
    )

    recordId = discussion.data.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})