import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionCommentSql from "../backendSiteDesignerDiscussionComment.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionComment.sql.js", () => {
  let d: dependencies;
  let recordId: string;
  let user: Model<backendUser>;
  let discussion: Model<backendSiteDesignerDiscussion>

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

  test("getManyWithPagination: empty database check.", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const getManyWithPagination = await commentSql.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)
  })

  test("addOne: backendSiteDesignerDiscussionComment can add record", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const newDiscussionComment = await commentSql.addOne({
      post: "post",
      userId: user.dataValues.id,
      discussionId: discussion.dataValues.id,
    })
    recordId = newDiscussionComment.data.dataValues.id

    expect(newDiscussionComment.data.dataValues.post).toEqual("post")
    expect(newDiscussionComment.data.dataValues.userId).toEqual(user.dataValues.id)
    expect(newDiscussionComment.data.dataValues.discussionId).toEqual(discussion.dataValues.id)
  })

  test("getManyWithPagination: get database.", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const getManyWithPagination = await commentSql.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(1)
  })

  test("updateOne: backendSiteDesignerDiscussionComment can update record", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const updateComment = await commentSql.updateOne({
      id: recordId,
      post: "post2",
    })

    expect(updateComment.data.dataValues.post).toEqual("post2")
  })

  test("deleteOne: backendSiteDesignerDiscussionComment can delete record", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const updateComment = await commentSql.deleteOne({
      id: recordId,
    })

    expect(updateComment.success).toBe(true)
  })

  test("getManyWithPagination: empty database check.", async () => {
    const commentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const getManyWithPagination = await commentSql.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

