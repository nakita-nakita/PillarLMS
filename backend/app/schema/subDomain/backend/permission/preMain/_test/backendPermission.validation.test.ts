import makeBackendPermissionSql from "../backendPermission.sql"
import makeBackendPermissionValidation from "../backendPermission.validation"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
jest.setTimeout(100000)

describe("test backendPermission.validation.js", () => {
  let d: dependencies
  let recordId: string
  let recordName: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const permissionSql = makeBackendPermissionSql(d)

    const permission = await permissionSql.addOne({
      name: "testing-blah-blah-1"
    })

    recordId = permission.data.dataValues.id
    recordName = permission.data.dataValues.name

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const areIdsValid = await permissionValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const areIdsValid = await permissionValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })
    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const isIdValid = await permissionValidation.isIdValid({
      id: recordId,
    })
    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const isIdValid = await permissionValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("isNameTaken: Yes.", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const isNameTaken = await permissionValidation.isNameTaken({
      name: recordName,
    })

    expect(isNameTaken.result).toBe(true);
  })

  test("isNameTaken: No", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const isIdValid = await permissionValidation.isNameTaken({
      name: "This is a fake name.",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("areNamesTaken: Yes.", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const isNameTaken = await permissionValidation.areNamesTaken({
      nameArray: [recordName],
    })
    expect(isNameTaken.result).toBe(true);
  })

  test("areNamesTaken: No", async () => {
    const permissionValidation = makeBackendPermissionValidation(d)

    const areNamesTaken = await permissionValidation.areNamesTaken({
      nameArray: ["This is a fake name."],
    })
    expect(areNamesTaken.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})