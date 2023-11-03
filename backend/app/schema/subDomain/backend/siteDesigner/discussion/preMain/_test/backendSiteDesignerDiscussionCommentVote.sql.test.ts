import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../backendSiteDesignerDiscussionCommentVote.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { backendSiteDesignerDiscussionVoteEnum } from "../scripts/discussionVoteSql/_utils.private";
import backendSiteDesignerDiscussionComment from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import makeBackendSiteDesignerDiscussionCommentSql from "../backendSiteDesignerDiscussionComment.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionCommentVote.sql.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesignerDiscussion>
  let comment: Model<backendSiteDesignerDiscussionComment>

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

