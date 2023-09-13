import { Sequelize } from "sequelize-typescript"
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb"
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger"
import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import makeBackendPermissionSql from "../backendPermission.sql"
import makeBackendPermissionValidation from "../backendPermission.validation"
jest.setTimeout(100000)

describe("test backendPermission.validation.js", () => {
  let d: d_sub
  let recordId: string
  let recordName: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb()
    const subDomainTransaction = await subDomainDb.transaction()

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

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
    await d.subDomainTransaction.rollback();
  })
})