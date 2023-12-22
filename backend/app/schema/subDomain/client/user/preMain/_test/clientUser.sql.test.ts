import { v4 as uuidv4 } from "uuid"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientUserSql from "../clientUser.sql";
jest.setTimeout(100000)

describe("test clientUser.sql.js", () => {
  let d: dependencies
  let recordId: string = uuidv4()

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const clientUser = makeClientUserSql(d)

    const addOne = await clientUser.addOne({
      id: recordId,

    })

    expect(addOne.data.dataValues.id).toEqual(recordId)
    expect(addOne.data.dataValues.isBlocked).toBe(false)

  })

  test("getOneById: can get record.", async () => {
    const clientUser = makeClientUserSql(d)

    const getOneById = await clientUser.getOneById({
      id: recordId,
    })

    expect(getOneById.data.dataValues.id).toEqual(recordId)
    expect(getOneById.data.dataValues.isBlocked).toBe(false)
  })

  test("getManyWithPagination: can get record.", async () => {
    const clientUser = makeClientUserSql(d)

    const getOneById = await clientUser.getManyWithPagination({})

    expect(getOneById.data.rows.length).toBeGreaterThan(0)
  })

  test("updateOne: can get record.", async () => {
    const clientUser = makeClientUserSql(d)

    const updateOne = await clientUser.updateOne({
      id: recordId,
      isBlocked: true
    })

    expect(updateOne.data.dataValues.id).toEqual(recordId)
    expect(updateOne.data.dataValues.isBlocked).toBe(true)
  })

  test("deleteOne: can get record.", async () => {
    const clientUser = makeClientUserSql(d)

    const deleteOne = await clientUser.deleteOne({
      id: recordId,
    })

    expect(deleteOne.success).toBe(true)

    const getOneById = await clientUser.getOneById({
      id: recordId,
    })

    expect(getOneById.data).toBeNull()
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

