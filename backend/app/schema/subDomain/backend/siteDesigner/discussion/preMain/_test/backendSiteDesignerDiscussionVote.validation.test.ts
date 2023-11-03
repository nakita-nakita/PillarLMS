import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionVoteSql from "../backendSiteDesignerDiscussionVote.sql"
import { backendSiteDesignerDiscussionVoteEnum } from "../scripts/discussionVoteSql/_utils.private"
import makeBackendSiteDesignerDiscussionVoteValidation from "../backendSiteDesignerDiscussionVote.validation"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
jest.setTimeout(100000)

describe("test backendSiteDesignerDiscussionVote.validation.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const userSql = makeBackendUserSql(d)

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)
    const discussionVoteSql = makeBackendSiteDesignerDiscussionVoteSql(d)

    const user = await userSql.addOne({
      id: uuid
    })

    const discussion = (await discussionSql.addOne(
      {
        post: "blah",
        title: "title",
        userId: user.data.dataValues.id
      })
    )

    const discussionVote = await discussionVoteSql.setMyVote({
      vote: backendSiteDesignerDiscussionVoteEnum.UP,
      discussionId: discussion.data.dataValues.id,
      userId: user.data.dataValues.id,
    })

    recordId = discussionVote.data.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const voteValidation = makeBackendSiteDesignerDiscussionVoteValidation(d)

    const areIdsValid = await voteValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const voteValidation = makeBackendSiteDesignerDiscussionVoteValidation(d)

    const areIdsValid = await voteValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const voteValidation = makeBackendSiteDesignerDiscussionVoteValidation(d)

    const isIdValid = await voteValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const voteValidation = makeBackendSiteDesignerDiscussionVoteValidation(d)

    const isIdValid = await voteValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})