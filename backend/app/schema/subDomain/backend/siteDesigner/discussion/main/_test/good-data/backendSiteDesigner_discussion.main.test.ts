import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserMain from "../../../../../user/main/backendUser.main";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";
import { backendSiteDesigner_discussion_getManyWithPaginationTypeEnum } from "../../../preMain/scripts/sql/getManyWithPagination.script";
import { addOneBackendUserResponse } from "../../../../../user/main/scripts/main/addOne.script";
jest.setTimeout(100000)

describe("test backendSiteDesigner_discussion.main.js", () => {
  let d: d_allDomain;
  let user: addOneBackendUserResponse;

  beforeAll(async () => {
    const uuid = uuidv4()

    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();


    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      domainDb,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const userMain = makeBackendUserMain({
      subDomainDb,
      domainDb,
      subDomainTransaction,
      domainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
      ],
    })

    const userResponse = await userMain.addOne({
      email: "asdf@asdftestjkejre.com",
      password: "ASDFasdf!!jk42$@J42k",
      username: "JFEKFEOFJEHFEHK4",
    })

    user = userResponse.data

  }, 100000)

  test("getManyWithPagination: empty database check.", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionSql(d)

    const getManyWithPagination = await discussionMain.getManyWithPagination({
      type: backendSiteDesigner_discussion_getManyWithPaginationTypeEnum.HOT,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  test("addOne & getOne & updateOne: backendSiteDesigner_discussion can add record.", async () => {
    const discussionMain = makeBackendSiteDesignerDiscussionSql(d)

    const newDiscussion = await discussionMain.addOne({
      post: "post",
      title: "title",
      userId: user.id,

    })
    expect(newDiscussion.data.dataValues.post).toEqual("post")
    expect(newDiscussion.data.dataValues.title).toEqual("title")

    const id = newDiscussion.data.dataValues.id;

    const getDiscussion = await discussionMain.getOneById({
      id,
    })
    expect(getDiscussion.data.dataValues.post).toEqual("post")

    const updateDiscussion = await discussionMain.updateOne({
      id,
      post: "post2"
    })
    expect(updateDiscussion.data.dataValues.post).toEqual("post2")
    expect(updateDiscussion.data.dataValues.title).toEqual("title")


    const deletedDiscussion = await discussionMain.deleteOne({
      id,
    })

    expect(deletedDiscussion.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

