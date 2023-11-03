import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionCommentSql from "../backendSiteDesignerDiscussionComment.sql"
import makeBackendSiteDesignerDiscussionCommentVoteValidation from "../backendSiteDesignerDiscussionCommentVote.validation"
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../backendSiteDesignerDiscussionCommentVote.sql"
import { backendSiteDesignerDiscussionVoteEnum } from "../scripts/discussionVoteSql/_utils.private"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"

jest.setTimeout(100000)

describe("test backendSiteDesignerDiscussionCommentVote.validation.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const userSql = makeBackendUserSql(d)

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentSql(d)
    const discussionCommentVoteSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    const user = await userSql.addOne({
      id: uuid
    })

    const discussion = (await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.data.dataValues.id,
    }))

    const discussionComment = (await discussionCommentSql.addOne(
      {
        post: "blah",
        discussionId: discussion.data.dataValues.id,
        userId: user.data.dataValues.id,
      })
    )

    const commentVote = (await discussionCommentVoteSql.setMyVote({
      commentId: discussionComment.data.dataValues.id,
      userId: user.data.dataValues.id,
      vote: backendSiteDesignerDiscussionVoteEnum.DOWN
    }))

    recordId = commentVote.data.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentVoteValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentVoteValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentVoteValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentVoteValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})