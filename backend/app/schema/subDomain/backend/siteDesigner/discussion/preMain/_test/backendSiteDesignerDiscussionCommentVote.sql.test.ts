import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../backendSiteDesignerDiscussionCommentVote.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import backendSiteDesignerDiscussion from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { backendSiteDesignerDiscussionVoteEnum } from "../scripts/discussionVoteSql/_utils.private";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import backendSiteDesignerDiscussionComment from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import makeBackendSiteDesignerDiscussionCommentSql from "../backendSiteDesignerDiscussionComment.sql";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionCommentVote.sql.js", () => {
  let d: d_allDomain;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesignerDiscussion>
  let comment: Model<backendSiteDesignerDiscussionComment>

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

    const userSql = makeBackendUserSql(d)
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    user = (await userSql.addOne({
      id: uuid,
    })).data

    discussion = (await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id
    })).data

    comment = (await commentSql.addOne({
      discussionId: discussion.dataValues.id,
      post: "post2",
      userId: user.dataValues.id,
    })).data

  }, 100000)

  test("getMyVote: No vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.getMyVote({
      commentId: comment.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data).toBe(null)

  })
  
  test("getTotalVote: No vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.getTotalVote({
      commentId: comment.dataValues.id,
    })

    expect(getMyVote.data).toBe(0)
  })

  test("setMyVote: up vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.setMyVote({
      commentId: comment.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.UP
    })

    expect(getMyVote.data.dataValues.vote).toBe(1)
  })

  test("getTotalVote: up vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.getMyVote({
      commentId: comment.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data.dataValues.vote).toBe(1)
  })

  test("setMyVote: down vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.setMyVote({
      commentId: comment.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.DOWN
    })

    expect(getMyVote.data.dataValues.vote).toBe(-1)
  })

  test("getTotalVote: down vote", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.getMyVote({
      commentId: comment.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data.dataValues.vote).toBe(-1)
  })


  test("getTotalVote: Final check", async () => {
    const commentVote = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await commentVote.getTotalVote({
      commentId: comment.dataValues.id,
    })

    expect(getMyVote.data).toBe(-1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

