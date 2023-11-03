import backendRole from "../../../../../../models/subDomain/backend/role/backendRole.model";
import backendUser from "../../../../../../models/subDomain/backend/user/backendUser.model";
import makeBackendUserManyRoleSql from "../backendUserManyRole.sql"
import makeBackendUserSql from "../backendUser.sql"
import makeBackendRoleSql from "../../../role/preMain/backendRole.sql"
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendUserManyRole.sql.js", () => {
  let d: dependencies
  let user: Model<backendUser>
  let role: Model<backendRole>

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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

