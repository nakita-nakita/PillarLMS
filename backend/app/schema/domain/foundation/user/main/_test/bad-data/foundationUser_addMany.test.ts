import makeFoundationUserMain from "../../foundationUser.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("foundationUser_addMany_error0001: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany(null)

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0001")
  })

  test("foundationUser_addMany_error0002: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany(new Array(51).map(a => ({
      email: "asdf@asdf.com",
      password: "ASDFasdf!1",
    })))

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0002")
  })

  test("foundationUser_addMany_error0003: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: null,
        password: "",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0003")
  })


  test("foundationUser_addMany_error0004: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "This is an email.",
        password: "",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0004")
  })


  test("foundationUser_addMany_error0005: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    await foundationUserMain.addMany([
      {
        email: "asdftestfoundationUserbaderror3@asdf.com",
        password: "ASDFasdf1!",
      }
    ])

    const addMany = await foundationUserMain.addMany([
      {
        email: "asdftestfoundationUserbaderror3@asdf.com",
        password: "",
      }
    ])
    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0005")
  })

  test("foundationUser_addMany_error0006: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "foundationUser_addMany_error0004@email.com",
        password: null,
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0006")
  })

  test("foundationUser_addMany_error0007: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "foundationUser_addMany_error0004@email.com",
        password: "abc",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0007")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})