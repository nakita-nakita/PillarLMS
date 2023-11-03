import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionMain from "../../backendSiteDesignerDiscussion.main"
import makeBackendSiteDesignerDiscussionCommentMain from "../../backendSiteDesignerDiscussionComment.main"
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerDiscussionComment.main.js", () => {
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

  test("getManyWithPagination: empty database check.", async () => {
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const getManyWithPagination = await commentMain.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)
  })

  test("addOne: backendSiteDesignerDiscussionComment can add record", async () => {
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const newDiscussionComment = await commentMain.addOne({
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
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const getManyWithPagination = await commentMain.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(1)
  })

  test("updateOne: backendSiteDesignerDiscussionComment can update record", async () => {
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const updateComment = await commentMain.updateOne({
      id: recordId,
      post: "post2",
    })

    expect(updateComment.data.dataValues.post).toEqual("post2")
  })

  test("deleteOne: backendSiteDesignerDiscussionComment can delete record", async () => {
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const updateComment = await commentMain.deleteOne({
      id: recordId,
    })

    expect(updateComment.success).toBe(true)
  })

  test("getManyWithPagination: empty database check.", async () => {
    const commentMain = makeBackendSiteDesignerDiscussionCommentMain(d)

    const getManyWithPagination = await commentMain.getManyWithPagination({
      discussionId: discussion.dataValues.id,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

