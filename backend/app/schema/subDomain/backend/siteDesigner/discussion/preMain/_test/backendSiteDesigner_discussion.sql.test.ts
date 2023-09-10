import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
// import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesigner_discussionSql from "../backendSiteDesigner_discussion.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import { backendSiteDesigner_discussion_getManyWithPaginationTypeEnum } from "../scripts/sql/getManyWithPagination.script";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
jest.setTimeout(100000)

describe("test backendSiteDesigner_discussion.sql.js", () => {
  let d: d_sub;
  let user: Model<backendUser>;

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
      subDomainDb,
      domainDb,
      subDomaintransaction,
      domainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers:[
        console,
      ],
    })

    user = (await userSql.addOne({
      id: uuid,
    })).data

  }, 100000)

  test("getManyWithPagination: empty database check.", async () => {
    const discussionSql = makeBackendSiteDesigner_discussionSql(d)

    const getManyWithPagination = await discussionSql.getManyWithPagination({
      type: backendSiteDesigner_discussion_getManyWithPaginationTypeEnum.HOT,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  test("addOne & getOne & updateOne: backendSiteDesigner_discussion can add record.", async () => {
    const discussionSql = makeBackendSiteDesigner_discussionSql(d)

    const newDiscussion = await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id,

    })
    expect(newDiscussion.data.dataValues.post).toEqual("post")
    expect(newDiscussion.data.dataValues.title).toEqual("title")

    const id = newDiscussion.data.dataValues.id;

    const getDiscussion = await discussionSql.getOneById({
      id,
    })
    expect(getDiscussion.data.dataValues.post).toEqual("post")

    const updateDiscussion = await discussionSql.updateOne({
      id,
      post: "post2"
    })
    expect(updateDiscussion.data.dataValues.post).toEqual("post2")
    expect(updateDiscussion.data.dataValues.title).toEqual("title")


    const deletedDiscussion = await discussionSql.deleteOne({
      id,
    })

    expect(deletedDiscussion.success).toBe(true)
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})

