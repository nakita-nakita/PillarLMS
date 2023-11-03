import makeFoundationUserProfileMain from "../../foundationUserProfile.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test foundationUserProfile.main.js upsertOne with bad data.", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("foundationUserProfile_upsertOne_error0001: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const upsertOne = await userProfileMain.upsertOne({
      id: ""
    })

    expect(upsertOne.success).toBe(false)
    expect(upsertOne.errorIdentifier).toEqual("foundationUserProfile_upsertOne_error0001")
  })

  test("foundationUserProfile_upsertOne_error0002: works", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const upsertOne = await userProfileMain.upsertOne({
      id: "This is a UUID"
    })

    expect(upsertOne.success).toBe(false)
    expect(upsertOne.errorIdentifier).toEqual("foundationUserProfile_upsertOne_error0002")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})