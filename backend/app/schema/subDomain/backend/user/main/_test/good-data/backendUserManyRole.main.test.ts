import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserManyRoleMain from "../../backendUserManyRole.main";
jest.setTimeout(100000)

describe("test backendUserManyRole.main.js", () => {
  let d: d_allDomain
  let ds: d_sub
  let user: addOneBackendUserResponse
  let role: Model<backendRole>

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
    const backendRoleMain = makeBackendRoleMain(ds)

    let uuid = uuidv4();

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
    await d.subDomaintransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

