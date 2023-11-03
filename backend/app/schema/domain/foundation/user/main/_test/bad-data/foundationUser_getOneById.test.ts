import makeFoundationUserMain from "../../foundationUser.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test foundationUser.main.js with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()

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
  
  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})