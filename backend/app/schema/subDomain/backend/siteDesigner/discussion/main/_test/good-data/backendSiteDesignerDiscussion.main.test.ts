import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
// import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerDiscussionMain from "../../backendSiteDesignerDiscussion.main"
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql";
import { backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum } from "../../../preMain/scripts/discussionSql/getManyWithPagination.script";
jest.setTimeout(100000)

describe("test backendSiteDesignerDiscussion.main.js", () => {
  let d: d_allDomain;
  let recordId: string;
  let user: Model<backendUser>;

  beforeAll(async () => {
    const uuid = uuidv4()

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

    const userMain = makeBackendUserSql(d)

    user = (await userMain.addOne({
      id: uuid,
    })).data

  }, 100000)

  test("getManyWithPagination: empty database check.", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const getManyWithPagination = await discussionMain.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.NEW,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  test('addOne: can add record', async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const newDiscussion = await discussionMain.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id,

    })
    recordId = newDiscussion.data.dataValues.id

    expect(newDiscussion.data.dataValues.post).toEqual("post")
    expect(newDiscussion.data.dataValues.title).toEqual("title")    
  })

  test('updateOne: can update record', async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const newDiscussion = await discussionMain.updateOne({
      id: recordId,
      post: "post2",
      title: "title2",

    })
    expect(newDiscussion.data.dataValues.post).toEqual("post2")
    expect(newDiscussion.data.dataValues.title).toEqual("title2")    
  })

  test("getManyWithPagination: get new record..", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const getManyWithPagination = await discussionMain.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.NEW,
    })

    expect(getManyWithPagination.data.rows.length).toBe(1)
  })
  
  test("deleteOne: get new record..", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const getManyWithPagination = await discussionMain.deleteOne({
      id: recordId,
    })

    expect(getManyWithPagination.success).toBe(true)
  })
  
  test("getManyWithPagination: empty database check.", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    const getManyWithPagination = await discussionMain.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.TOP,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

