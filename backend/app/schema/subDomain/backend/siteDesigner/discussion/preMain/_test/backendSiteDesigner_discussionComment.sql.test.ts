import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
// import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserLogic from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionLogic from "../backendSiteDesigner_discussion.sql"
import makeBackendSiteDesigner_discussionCommentLogic from "../backendSiteDesigner_discussionComment.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import backendSiteDesigner_discussion from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
jest.setTimeout(100000)


describe("test backendSiteDesigner_discussionComment.logic.js", () => {
  let d: d_allDomain;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesigner_discussion>

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

    const userLogic = makeBackendUserLogic(d)

    const discussionLogic = makeBackendSiteDesignerDiscussionLogic(d)

    user = (await userLogic.addOne({
      id: uuid,
    })).data

    discussion = (await discussionLogic.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id
    })).data

  }, 100000)

  test("getManyWithPagination: empty database check.", async () => {
    const discussionCommentLogic = makeBackendSiteDesigner_discussionCommentLogic(d)

    const getManyWithPagination = await discussionCommentLogic.getManyWithPagination({})

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  test("addOne & getOne & updateOne: backendSiteDesigner_discussionComment can add record.", async () => {
    const discussionCommentLogic = makeBackendSiteDesigner_discussionCommentLogic(d)

    const newDiscussionComment = await discussionCommentLogic.addOne({
      post: "post",
      userId: user.dataValues.id,
      discussionId: discussion.dataValues.id,
    })
    expect(newDiscussionComment.data.dataValues.post).toEqual("post")

    const id = newDiscussionComment.data.dataValues.id;

    const getDiscussionComment = await discussionCommentLogic.getOneById({
      id,
    })
    expect(getDiscussionComment.data.dataValues.post).toEqual("post")

    const updateDiscussionComment = await discussionCommentLogic.updateOne({
      id,
      post: "post2"
    })
    expect(updateDiscussionComment.data.dataValues.post).toEqual("post2")

    const deletedDiscussionComment = await discussionCommentLogic.deleteOne({
      id,
    })

    expect(deletedDiscussionComment.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

