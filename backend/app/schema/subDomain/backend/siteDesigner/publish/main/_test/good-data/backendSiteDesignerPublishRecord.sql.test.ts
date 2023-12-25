import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../../utils/dependencies/makeTestDependency";
import makeBackendSiteDesignerPublishRecordMain from "../../backendSiteDesignerPublishRecord.main";
jest.setTimeout(100000)


describe("test backendSiteDesignerPublishRecord.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const addOne = await publishMain.addOne({
      numberOfPages: 3,
    })
    recordId = addOne.data.dataValues.id

    expect(addOne.data.dataValues.numberOfPages).toBe(3)
  })

  test("getMany: can get all records.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const getMany = await publishMain.getMany()

    expect(getMany.data.length).toBe(1)
  })

  test("getOneById: can get record.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const getOneById = await publishMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.numberOfPages).toBe(3)
  })

  test("updateOne: can update record.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const updatePage = await publishMain.updateOne({
      id: recordId,
      numberOfPages: 4,
    })
    
    expect(updatePage.data.dataValues.numberOfPages).toBe(4)
  })

  test("getManyWithPagination: can get many with pagination.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const getManyWithPagination = await publishMain.getManyWithPagination({})
    expect(getManyWithPagination.data.rows.length).toBeGreaterThan(0)
  })
  
  test("deleteOne: can delete record.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const deleteOne = await publishMain.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)
  })

  test("getOneById: double check for deleted record.", async () => {
    const publishMain = makeBackendSiteDesignerPublishRecordMain(d)

    const getOneById = await publishMain.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBe(null)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

