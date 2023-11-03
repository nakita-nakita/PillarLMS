import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionMain from "../../backendSiteDesignerDiscussion.main"
import makeBackendSiteDesignerDiscussionVoteMain from "../../backendSiteDesignerDiscussionVote.main"
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { backendSiteDesignerDiscussionVoteEnum } from "../../../preMain/scripts/discussionVoteSql/_utils.private";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionVote.main.js", () => {
  let d: dependencies;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesignerDiscussion>

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const userSql = makeBackendUserSql(d)
    const discussionMain = makeBackendSiteDesignerDiscussionMain(d)

    user = (await userSql.addOne({
      id: uuid,
    })).data

    discussion = (await discussionMain.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id
    })).data

  }, 100000)

  test("getMyVote: No vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data).toBe(null)

  })
  
  test("getTotalVote: No vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.getTotalVote({
      discussionId: discussion.dataValues.id,
    })

    expect(getMyVote.data).toBe(0)
  })

  test("setMyVote: up vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.setMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.UP
    })

    expect(getMyVote.data.dataValues.vote).toBe(1)
  })

  test("getTotalVote: up vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data.dataValues.vote).toBe(1)
  })

  test("setMyVote: down vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.setMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.DOWN
    })

    expect(getMyVote.data.dataValues.vote).toBe(-1)
  })

  test("getTotalVote: down vote", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data.dataValues.vote).toBe(-1)
  })


  test("getTotalVote: Final check", async () => {
    const discussionCommentMain = makeBackendSiteDesignerDiscussionVoteMain(d)

    const getMyVote = await discussionCommentMain.getTotalVote({
      discussionId: discussion.dataValues.id,
    })

    expect(getMyVote.data).toBe(-1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

