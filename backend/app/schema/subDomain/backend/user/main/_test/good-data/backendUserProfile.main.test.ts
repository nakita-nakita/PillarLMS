import { Model } from "sequelize";
import makeBackendUserMain from "../../backendUser.main";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserProfileMain from "../../backendUserProfile.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendUserManyRole.main.js", () => {
  let d: dependencies
  let user: addOneBackendUserResponse
  let role: Model<backendRole>

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendUserMain = makeBackendUserMain(d)

    user = (await backendUserMain.addOne({
      email: "aasdfasdf@sdfjkeffejk.com",
      password: "ASDFASDFasdfjkle@!#124hk242!@",
      username: "blahl_test_username"
    })).data

  }, 100000)

  // test("deactivateOne: makeBackendUserProfile.", async () => {
  //   const backendUserBasicViewMain = makeBackendUserProfileMain(d)

  //   const me = await backendUserBasicViewMain.deactivateOne({
  //     id: user.id
  //   })
  //   expect(me.success).toBe(true)
  // })

  // test("reactivateOne: makeBackendUserProfile.", async () => {
  //   const backendUserBasicViewMain = makeBackendUserProfileMain(d)

  //   const me = await backendUserBasicViewMain.reactivateOne({
  //     id: user.id
  //   })
  //   expect(me.success).toBe(true)
  // })

  test("getOneById: makeBackendUserProfile.", async () => {
    const backendUserBasicViewMain = makeBackendUserProfileMain(d)

    const me = await backendUserBasicViewMain.getOneById({
      id: user.id
    })
    expect(me.success).toBe(true)
  })

  test("updateOne: makeBackendUserProfile.", async () => {
    const backendUserBasicViewMain = makeBackendUserProfileMain(d)

    const me = await backendUserBasicViewMain.updateOne({
      id: user.id,
      // add values later
    })
    expect(me.success).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})