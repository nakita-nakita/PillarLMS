import { Sequelize } from "sequelize-typescript";
import backendRole from "../../../../../../models/subDomain/backend/role/backendRole.model";
import backendUser from "../../../../../../models/subDomain/backend/user/backendUser.model";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserManyRoleSql from "../backendUserManyRole.sql"
import makeBackendUserSql from "../backendUser.sql"
import makeBackendRoleSql from "../../../role/preMain/backendRole.sql"
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
jest.setTimeout(100000)


describe("test backendUserManyRole.sql.js", () => {
  let d: d_allDomain
  let user: Model<backendUser>
  let role: Model<backendRole>

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt,
      ]
    };

    const backendUserSql = makeBackendUserSql(d)
    const backendRoleSql = makeBackendRoleSql(d)

    let uuid = uuidv4();

    user = (await backendUserSql.addOne({
      id: uuid
    })).data

    role = (await backendRoleSql.addOne({
      name: "test role"
    })).data

  }, 100000)

  test("addOne & getOne: backendUserManyRoles can add record.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const newUserManyRole = await userManyRoleSql.addOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(newUserManyRole.success).toBe(true)


    const deletedUserManyRole = await userManyRoleSql.deleteOne({
      roleId: role.dataValues.id,
      userId: user.dataValues.id,
    })
    expect(deletedUserManyRole.success).toBe(true)
  })

  test("addMany & deleteMany: backendUserManyRoles can add many records at once.", async () => {
    const userManyRoleSql = makeBackendUserManyRoleSql(d)

    const addManyRole = await userManyRoleSql.addMany({
      userId: user.dataValues.id,
      roleIdsArray: [role.dataValues.id],
    })
    expect(addManyRole.success).toBe(true)

    const deleteManyRole = await userManyRoleSql.deleteMany({
      userId: user.dataValues.id,
      roleIdsArray: [role.dataValues.id],
    })
    expect(deleteManyRole.success).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

