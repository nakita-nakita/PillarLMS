import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql";
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../../../preMain/backendSiteDesigner_discussionVote.sql";
import { backendSiteDesignerDiscussionVoteEnum } from "../../../preMain/scripts/discussionVoteSql/_utils.private";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";
jest.setTimeout(100000)


describe("test backendSiteDesigner_discussionVote.sql.js", () => {
  let d: d_allDomain
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

    const userSql = makeBackendUserSql(d)
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    user = (await userSql.addOne({
      id: uuid,
    })).data

    discussion = (await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id
    })).data

  }, 100000)

  test("getMyVote: No vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data).toEqual(backendSiteDesignerDiscussionVoteEnum.NONE)

  })
  
  test("getTotalVote: No vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.getTotalVote({
      discussionId: discussion.dataValues.id,
    })

    expect(getMyVote.data).toBe(0)
  })

  test("setMyVote: up vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.setMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.UP
    })

    expect(getMyVote.data).toEqual(backendSiteDesignerDiscussionVoteEnum.UP)
  })

  test("getTotalVote: up vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data).toEqual(backendSiteDesignerDiscussionVoteEnum.UP)
  })

  test("setMyVote: down vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.setMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.DOWN
    })

    expect(getMyVote.data).toEqual(backendSiteDesignerDiscussionVoteEnum.DOWN)
  })

  test("getTotalVote: down vote", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.getMyVote({
      discussionId: discussion.dataValues.id,
      userId: user.dataValues.id,
    })

    expect(getMyVote.data).toEqual(backendSiteDesignerDiscussionVoteEnum.DOWN)
  })


  test("getTotalVote: Final check", async () => {
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const getMyVote = await discussionCommentSql.getTotalVote({
      discussionId: discussion.dataValues.id,
    })

    expect(getMyVote.data).toBe(-1)
  })

  // test("addOne & getOne & updateOne: backendSiteDesigner_discussionVote can add record.", async () => {
  //   const discussionCommentSql = makeBackendSiteDesigner_discussionVoteSql(dpObj)

  //   const newDiscussionComment = await discussionCommentSql.addOne({
  //     post: "post",
  //     userId: user.dataValues.id,
  //     discussionId: discussion.dataValues.id,
  //   })
  //   expect(newDiscussionComment.data.dataValues.post).toEqual("post")

  //   const id = newDiscussionComment.data.dataValues.id;

  //   const getDiscussionComment = await discussionCommentSql.getOneById({
  //     id,
  //   })
  //   expect(getDiscussionComment.data.dataValues.post).toEqual("post")

  //   const updateDiscussionComment = await discussionCommentSql.updateOne({
  //     id,
  //     post: "post2"
  //   })
  //   expect(updateDiscussionComment.data.dataValues.post).toEqual("post2")

  //   const deletedDiscussionComment = await discussionCommentSql.deleteOne({
  //     id,
  //   })

  //   expect(deletedDiscussionComment.success).toBe(true)
  // })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

