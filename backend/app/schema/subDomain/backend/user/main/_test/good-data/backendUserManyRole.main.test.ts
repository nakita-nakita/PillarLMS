import { Model } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserManyRoleMain from "../../backendUserManyRole.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
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
    const backendRoleMain = makeBackendRoleMain(d)

    user = (await backendUserMain.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
      username: "test_username_blah_blah"

    })).data

    role = (await backendRoleMain.addOne({
      name: "test role"
    })).data

    // const backendUserMain = makeBackendUserMain(d)

  }, 100000)

  test("addOne & getOne: backendUserManyRoles can add record.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const newUserManyRole = await userManyRoleMain.addOne({
      roleId: role.dataValues.id,
      userId: user.id,
    })
    expect(newUserManyRole.success).toBe(true)


    const deletedUserManyRole = await userManyRoleMain.deleteOne({
      roleId: role.dataValues.id,
      userId: user.id,
    })
    expect(deletedUserManyRole.success).toBe(true)
  })

  test("setList & getAll: backendUserManyRoles can add many records at once.", async () => {
    const userManyRoleMain = makeBackendUserManyRoleMain(d)

    const addManyRole = await userManyRoleMain.setList(
      [{
        userId: user.id,
        roleId: role.dataValues.id,
      }]
    )
    expect(addManyRole.success).toBe(true)

    const deletedUserManyRole = await userManyRoleMain.getAll({
      id: user.id
    })
    expect(deletedUserManyRole.success).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

