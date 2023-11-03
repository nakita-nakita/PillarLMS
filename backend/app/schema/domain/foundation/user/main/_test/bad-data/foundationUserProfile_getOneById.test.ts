import makeFoundationUserProfileMain from "../../foundationUserProfile.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test foundationUserProfile.main.js getOneById with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {

    d = await makeDTestObj()

  }, 100000)

  test("foundationUserProfile_getOneById_error0001: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const getOneById = await userProfileMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUserProfile_getOneById_error0001")
  })

  test("foundationUserProfile_getOneById_error0002: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const getOneById = await userProfileMain.getOneById({
      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("foundationUserProfile_getOneById_error0002")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})