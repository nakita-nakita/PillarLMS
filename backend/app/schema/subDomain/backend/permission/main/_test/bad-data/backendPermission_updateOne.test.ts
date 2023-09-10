import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../../backendPermission.main";
jest.setTimeout(100000)

describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: d_sub
  let recordId: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const transaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const permissionMain = makeBackendPermissionMain(d)

    recordId = (await permissionMain.addOne({
      name: "test: for updating! 12345"
    })).data.dataValues.id

  }, 100000)

  test("backendPermission_updateOne_error0001: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const updateOne = await permissionMain.updateOne({
      id: "",
      name: "filler-doesn't matter",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendPermission_updateOne_error0001")
  })

  test("backendPermission_updateOne_error0002: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const updateOne = await permissionMain.updateOne({
      id: "This is a UUID",
      name: "filler-doesn't matter",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendPermission_updateOne_error0002")
  })

  test("backendPermission_updateOne_error0003: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const deleteOne = await permissionMain.updateOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      name: "filler-doesn't matter",
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendPermission_updateOne_error0003")
  })

  test("backendPermission_updateOne_error0004: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const updateOne = await permissionMain.updateOne({
      id: recordId,
      name: null
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendPermission_updateOne_error0004")
  })

  test("backendPermission_updateOne_error0005: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const updateOne = await permissionMain.updateOne({
      id: recordId,
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendPermission_updateOne_error0005")
  })

  test("backendPermission_updateOne_error0006: works", async () => {
    const permissionMain = makeBackendPermissionMain(d)

    const updateOne = await permissionMain.updateOne({
      id: recordId,
      name: "test: for updating! 12345",
    })
    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendPermission_updateOne_error0006")
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})