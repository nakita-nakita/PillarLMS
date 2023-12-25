import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPublishRecordSql from "../backendSiteDesignerPublishRecord.sql";
jest.setTimeout(100000)


describe("test backendSiteDesignerPublishRecord.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const addOne = await publishSql.addOne({
      numberOfPages: 3,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.numberOfPages).toBe(3)
  })

  test("getMany: can get all records.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const getMany = await publishSql.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const getOneById = await publishSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.numberOfPages).toBe(3)
  })

  test("updateOne: can update record.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const updatePage = await publishSql.updateOne({
      id: recordId,
      numberOfPages: 4,
    })
    
    expect(updatePage.data.dataValues.numberOfPages).toBe(4)
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const getManyWithPagination = await publishSql.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: can delete record.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const deleteOne = await publishSql.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const publishSql = makeBackendSiteDesignerPublishRecordSql(d)

    const getOneById = await publishSql.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

