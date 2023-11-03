import makeFoundationUserMain from "../../foundationUser.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test foundationUser.main.js", () => {
  let d: dependencies
  let recordId: string;

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("addOne: can add record.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const newUser = await foundationUserMain.addOne({
      email: "asdf@asdf.com",
      password: "asdfADSF1!",
      isDeactivated: false,
    })
    recordId = newUser.data.dataValues.id
    expect(newUser.data.dataValues.email).toEqual("asdf@asdf.com")
    expect(newUser.data.dataValues.isDeactivated).toBe(false)

  })

  test("getOneById: can getOneById record.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const getUser = await foundationUserMain.getOneById({
      id: recordId,
    })
    expect(getUser.data.dataValues.email).toEqual("asdf@asdf.com")
    expect(getUser.data.dataValues.isDeactivated).toBe(false)
  })

  test("updateOne: can update record.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const updateUser = await foundationUserMain.updateOne({
      id: recordId,
      email: "asdf2@asdf2.com",
      password: "fjFJ123!@#fjFJ",
    })
    expect(updateUser.data.dataValues.email).toEqual("asdf2@asdf2.com")
    expect(updateUser.data.dataValues.isDeactivated).toBe(false)
  })

  test("deactivateOne: can deactivate record.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const deactivateOne = await foundationUserMain.deactivateOne({
      id: recordId,
    })
    expect(deactivateOne.success).toBe(true)
  })

  test("reactivateOne: can reactivate record.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const deactivateOne = await foundationUserMain.reactivateOne({
      id: recordId,
    })
    expect(deactivateOne.success).toBe(true)
  })

  test("addMany: can add many records.", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const deactivateOne = await foundationUserMain.addMany([
      {
        email: "asdf123@asdf123.com",
        password: "ASDFasdf1!",
      },
      {
        email: "asdf123@asdf123.com",
        password: "ASDFasdf1!",
        isDeactivated: true,
      },
    ])
    expect(deactivateOne.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

