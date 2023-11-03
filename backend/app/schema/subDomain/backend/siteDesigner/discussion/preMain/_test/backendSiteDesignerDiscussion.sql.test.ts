import { v4 as uuidv4 } from "uuid"
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { Model } from "sequelize";
import { backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum } from "../scripts/discussionSql/getManyWithPagination.script";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendSiteDesignerDiscussion.sql.js", () => {
  let d: dependencies;
  let recordId: string;
  let user: Model<backendUser>;

  beforeAll(async () => {
    const uuid = uuidv4()

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const userSql = makeBackendUserSql(d)

    user = (await userSql.addOne({
      id: uuid,
    })).data

  }, 100000)

  test("getManyWithPagination: empty database check.", async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const getManyWithPagination = await discussionSql.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.NEW,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  test('addOne: can add record', async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const newDiscussion = await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.dataValues.id,

    })
    recordId = newDiscussion.data.dataValues.id

    expect(newDiscussion.data.dataValues.post).toEqual("post")
    expect(newDiscussion.data.dataValues.title).toEqual("title")    
  })

  test('updateOne: can update record', async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const newDiscussion = await discussionSql.updateOne({
      id: recordId,
      post: "post2",
      title: "title2",

    })
    expect(newDiscussion.data.dataValues.post).toEqual("post2")
    expect(newDiscussion.data.dataValues.title).toEqual("title2")    
  })

  test("getManyWithPagination: get new record..", async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const getManyWithPagination = await discussionSql.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.NEW,
    })

    expect(getManyWithPagination.data.rows.length).toBe(1)
  })
  
  test("deleteOne: get new record..", async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const getManyWithPagination = await discussionSql.deleteOne({
      id: recordId,
    })

    expect(getManyWithPagination.success).toBe(true)
  })
  
  test("getManyWithPagination: empty database check.", async () => {
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    const getManyWithPagination = await discussionSql.getManyWithPagination({
      type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum.TOP,
    })

    expect(getManyWithPagination.data.rows.length).toBe(0)

  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

