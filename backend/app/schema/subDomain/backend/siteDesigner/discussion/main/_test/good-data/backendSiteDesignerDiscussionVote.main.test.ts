import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionMain from "../../backendSiteDesignerDiscussion.main"
import makeBackendSiteDesignerDiscussionVoteMain from "../../backendSiteDesignerDiscussionVote.main"
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { backendSiteDesignerDiscussionVoteEnum } from "../../../preMain/scripts/discussionVoteSql/_utils.private";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionVote.main.js", () => {
  let d: d_allDomain;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesignerDiscussion>

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

