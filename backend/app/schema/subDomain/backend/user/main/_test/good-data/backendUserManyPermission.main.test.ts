import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserManyPermissionMain from "../../backendUserManyPermission.main";
jest.setTimeout(100000)

describe("test backendUserManyPermission.main.js", () => {
  let d: d_allDomain
  let ds: d_sub
  let user: addOneBackendUserResponse
  let permission: Model<backendPermission>

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomaintransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomaintransaction,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    ds = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction:subDomaintransaction,
      loggers: [
        console,
        throwIt,
      ]
    }

    const backendUserMain = makeBackendUserMain(d)
    const backendPermissionMain = makeBackendPermissionMain(ds)

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
    await d.subDomaintransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

