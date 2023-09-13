import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../backendPermission.main";
jest.setTimeout(100000)

describe("test backendPermission.main.js with bad data.", () => {
  let d: d_sub

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("backendPermission_addMany_error0001: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany(null)

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error0001")
  })

  test("backendPermission_addMany_error0002: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany(new Array(51).map((element, i) => ({
      name: `testname-${i}`
    })))

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error0002")
  })

  test("backendPermission_addMany_error0003: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany([
      {
        name: undefined
      },
      {
        name: "A super cool new permission."
      },
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error0003")
  })

  test("backendPermission_addMany_error0004: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    const addMany = await backendPermissionMain.addMany([
      {
        name: "12345678901234567890123456789012345678901234567890. too long. "
      },
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error0004")
  })

  test("backendPermission_addMany_error0005: works", async () => {
    const backendPermissionMain = makeBackendPermissionMain(d)

    await backendPermissionMain.addMany([
      {
        name: "error0005: This name will repeat to fail.",
      }
    ])

    const addMany = await backendPermissionMain.addMany([
      {
        name: "error0005: This name will repeat to fail.",
      }
    ])
    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("backendPermission_addMany_error0005")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})