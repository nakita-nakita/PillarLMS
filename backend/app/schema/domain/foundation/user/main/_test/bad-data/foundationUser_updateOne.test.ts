import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserMain from "../../foundationUser.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: dependencies
  let recordId: string;

  beforeAll(async () => {
    
    d = await makeDTestObj()

    const userSql = makeFoundationUserSql(d)

    const addOne = await userSql.addOne({
      email: "asdfFoundationUser_updateOne@datagrace.io",
      password: "ASDFasdf!1",
    })
    
    recordId = addOne.data.dataValues.id

  }, 100000)

  test("foundationUser_getOneById_error0001: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0001")
  })

  test("foundationUser_getOneById_error0002: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0002")
  })

  test("foundationUser_getOneById_error0003: works", async () => {
    const userMain = makeFoundationUserMain(d)

    const getOneById = await userMain.getOneById({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUser_getOneById_error0003")
  })

  test("foundationUser_updateOne_error0004: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const updateOne = await foundationUserMain.updateOne({
      id: recordId,
      email: null,
      password: "",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("foundationUser_updateOne_error0004")
  })


  test("foundationUser_updateOne_error0005: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const updateOne = await foundationUserMain.updateOne({
      id: recordId,
      email: "this is an email",
      password: "",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("foundationUser_updateOne_error0005")
  })


  test("foundationUser_updateOne_error0006: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    await foundationUserMain.updateOne({
      id: recordId,
      email: "asdftestfoundationUserbaderror3@asdf.com",
      password: "ASDFasdf1!",
    })

    const updateOne = await foundationUserMain.updateOne({
      id: recordId,
      email: "asdftestfoundationUserbaderror3@asdf.com",
      password: "",
    })
    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("foundationUser_updateOne_error0006")
  })

  test("foundationUser_updateOne_error0007: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const updateOne = await foundationUserMain.updateOne({
      id: recordId,
      email: "foundationUser_updateOne_error0004@email.com",
      password: null,
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("foundationUser_updateOne_error0007")
  })

  test("foundationUser_updateOne_error0008: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const updateOne = await foundationUserMain.updateOne({
      id: recordId,
      email: "foundationUser_updateOne_error0004@email.com",
      password: "abc",
    })

    expect(updateOne.success).toBe(false)
    expect(updateOne.errorIdentifier).toEqual("foundationUser_updateOne_error0008")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})