import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserManyPermissionMain from "../../backendUserManyPermission.main";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendUserManyPermission.main.js", () => {
  let d: dependencies
  let user: addOneBackendUserResponse
  let permission: Model<backendPermission>

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const backendUserMain = makeBackendUserMain(d)
    const backendPermissionMain = makeBackendPermissionMain(d)

    let uuid = uuidv4();

    user = (await backendUserMain.addOne({
      email: "asdf@aasdf.com",
      password: "blahBLAH!#@jklN24",
      username: "test_username_blah_blah"

    })).data

    permission = (await backendPermissionMain.addOne({
      name: "test permission"
    })).data

    // const backendUserMain = makeBackendUserMain(d)

  }, 100000)

  test("addOne & getOne: backendUserManyPermissions can add record.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const newUserManyPermission = await userManyPermissionMain.addOne({
      permissionId: permission.dataValues.id,
      userId: user.id,
    })
    expect(newUserManyPermission.success).toBe(true)


    const deletedUserManyPermission = await userManyPermissionMain.deleteOne({
      permissionId: permission.dataValues.id,
      userId: user.id,
    })
    expect(deletedUserManyPermission.success).toBe(true)
  })

  test("setList & getAll: backendUserManyPermissions can add many records at once.", async () => {
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d)

    const addManyPermission = await userManyPermissionMain.setList(
      [{
        userId: user.id,
        permissionId: permission.dataValues.id,
      }]
    )
    expect(addManyPermission.success).toBe(true)

    const deletedUserManyPermission = await userManyPermissionMain.getAll({
      id: user.id
    })
    expect(deletedUserManyPermission.success).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

