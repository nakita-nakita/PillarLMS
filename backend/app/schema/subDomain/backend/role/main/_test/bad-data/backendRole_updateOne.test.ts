import makeBackendRoleMain from "../../backendRole.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const roleMain = makeBackendRoleMain(d)

    recordId = (await roleMain.addOne({
      name: "test: for updating! 12345"
    })).data.dataValues.id

  }, 100000)

  test("backendRole_updateOne_error0001: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateOne = await roleMain.updateOne({
      id: "",
      name: "filler-doesn't matter",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendRole_updateOne_error0001")
  })

  test("backendRole_updateOne_error0002: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateOne = await roleMain.updateOne({
      id: "This is a UUID",
      name: "filler-doesn't matter",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendRole_updateOne_error0002")
  })

  test("backendRole_updateOne_error0003: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deleteOne = await roleMain.updateOne({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
      name: "filler-doesn't matter",
    })

    expect(deleteOne.success).toBe(false)
    expect(deleteOne.errorIdentifier).toEqual("backendRole_updateOne_error0003")
  })

  test("backendRole_updateOne_error0004: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateOne = await roleMain.updateOne({
      id: recordId,
      name: null
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendRole_updateOne_error0004")
  })

  test("backendRole_updateOne_error0005: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateOne = await roleMain.updateOne({
      id: recordId,
      name: "12345678901234567890123456789012345678901234567890 - blah"
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendRole_updateOne_error0005")
  })

  test("backendRole_updateOne_error0006: works", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateOne = await roleMain.updateOne({
      id: recordId,
      name: "test: for updating! 12345",
    })
    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("backendRole_updateOne_error0006")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})