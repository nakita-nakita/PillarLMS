import { v4 as uuidv4 } from "uuid"
import makeFoundationUserProfileMain from "../../foundationUserProfile.main"
import { CallByTypeEnum } from "../../../preMain/scripts/foundationUserProfileSql/upsertOne.script"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency"
jest.setTimeout(100000)

describe("test foundationUserProfile.main.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("upsertOne: foundationUserProfile can add record.", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const newUserProfile = await userProfileMain.upsertOne({
      id:  uuidv4(),
      firstName: "John",
      lastName: "Doe",
      username: "Cool Username!",
      picture: "no-picture-in-test",
      callByType: CallByTypeEnum.EMAIL,
      circleColor: "#f1f4f5",
      labelColor: "#fba1ff",
    })
    recordId = newUserProfile.data.dataValues.id
    expect(newUserProfile.success).toEqual(true)
    expect(newUserProfile.data.dataValues.firstName).toEqual("John")
    expect(newUserProfile.data.dataValues.lastName).toEqual("Doe")
    expect(newUserProfile.data.dataValues.username).toEqual("Cool Username!")
    expect(newUserProfile.data.dataValues.picture).toEqual("no-picture-in-test")
    expect(newUserProfile.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL.toString())
    expect(newUserProfile.data.dataValues.circleColor).toEqual("#f1f4f5")
    expect(newUserProfile.data.dataValues.labelColor).toEqual("#fba1ff")

  })

  test("getOne: foundationUserProfiles can add record.", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const getUserProfile = await userProfileMain.getOneById({
      id: recordId,
    })
    expect(getUserProfile.success).toEqual(true)
    expect(getUserProfile.data.dataValues.firstName).toEqual("John")
    expect(getUserProfile.data.dataValues.lastName).toEqual("Doe")
    expect(getUserProfile.data.dataValues.username).toEqual("Cool Username!")
    expect(getUserProfile.data.dataValues.picture).toEqual("no-picture-in-test")
    expect(getUserProfile.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL.toString())
    expect(getUserProfile.data.dataValues.circleColor).toEqual("#f1f4f5")
    expect(getUserProfile.data.dataValues.labelColor).toEqual("#fba1ff")
    })


  test("updateOne: foundationUserProfiles can update record.", async () => {
    const userProfileMain = makeFoundationUserProfileMain(d)

    const updateUserProfile = await userProfileMain.upsertOne({
      id:  recordId,
      labelColor: "blue"
    })
    expect(updateUserProfile.success).toEqual(true)
    expect(updateUserProfile.data.dataValues.firstName).toEqual("John")
    expect(updateUserProfile.data.dataValues.lastName).toEqual("Doe")
    expect(updateUserProfile.data.dataValues.username).toEqual("Cool Username!")
    expect(updateUserProfile.data.dataValues.picture).toEqual("no-picture-in-test")
    expect(updateUserProfile.data.dataValues.callByType).toEqual(CallByTypeEnum.EMAIL.toString())
    expect(updateUserProfile.data.dataValues.circleColor).toEqual("#f1f4f5")
    expect(updateUserProfile.data.dataValues.labelColor).toEqual("blue")
    })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

