import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import makeBackendUserMain from "../../backendUser.main";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserBasicViewMain from "../../backendUserBasicView.main";
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

    let uuid = uuidv4();

    user = (await backendUserMain.addOne({
      email: "aasdfasdf@sdfjkeffejk.com",
      password: "ASDFASDFasdfjkle@!#124hk242!@",
      username: "blahl_test_username"
    })).data

  }, 100000)

  test("me & them: backendUserBasicView can add many records at once.", async () => {
    const backendUserBasicViewMain = makeBackendUserBasicViewMain(d)

    const me = await backendUserBasicViewMain.me({
      id: user.id
    })
    expect(me.success).toBe(true)

    const them = await backendUserBasicViewMain.them({
      id: user.id
    })
    expect(them.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})