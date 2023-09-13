import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { v4 as uuidv4 } from "uuid"
import makeBackendRoleSql from "../../../role/preMain/backendRole.sql"
import makeBackendUserSql from "../backendUser.sql"
import makeBackendUserValidation from "../backendUser.validation"
import makeBackendPermissionSql from "../../../permission/preMain/backendPermission.sql"
import makeBackendUserManyPermissionSql from "../backendUserManyPermission.sql"
import makeBackendUserManyRoleSql from "../backendUserManyRole.sql"
// import makeBackendSetting_backendUserRequestSql from "../../../setting/backendUserRequest/preMain/backendSetting_backendUserRequest.sql"
import { Model } from "sequelize";
import backendUser from "../../../../../../models/subDomain/backend/user/backendUser.model";
import backendRole from "../../../../../../models/subDomain/backend/role/backendRole.model";
import backendPermission from "../../../../../../models/subDomain/backend/permission/backendPermission.model";
// import { backendSetting_backendUserRequestEnum } from "../../../../../../models/subDomain/backend/setting/backendSetting_church.model";
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendUser.validation.js", () => {
  let d: d_allDomain
  let user: Model<backendUser>
  let role: Model<backendRole>
  let permission: Model<backendPermission>

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestSubdomainDb();
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

    let uuid = uuidv4()

    const backendUserSql = makeBackendUserSql(d)
    const backendPermissionSql = makeBackendPermissionSql(d)
    const backendRoleSql = makeBackendRoleSql(d)

    user = (await backendUserSql.addOne({
      id: uuid
    })).data

    permission = (await backendPermissionSql.addOne({
      name: "test permission"
    })).data

    role = (await backendRoleSql.addOne({
      name: "test role"
    })).data


  }, 100000)

  // test("areIdValid: test three real ids", async () => {

  //   const userValidation = makeBackendUserValidation(ds)
  //   const backendUserRequestSql = makeBackendSetting_backendUserRequestSql(ds)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.ANYONE
  //   })

  //   const canUserSignUp = await userValidation.canUserSignUp()
  //   expect(canUserSignUp.result).toBe(true)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.MANUAL
  //   })

  //   const canUserSignUp2 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp2.result).toBe(false)


  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.REQUEST
  //   })

  //   const canUserSignUp3 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp3.result).toBe(false)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.REQUEST_NO_PASSWORD
  //   })

  //   const canUserSignUp4 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp4.result).toBe(false)
  // })

  // test("areIdsValid: test three real ids", async () => {

  //   const userValidation = makeBackendUserValidation(ds)
  //   const backendUserRequestSql = makeBackendSetting_backendUserRequestSql(ds)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.ANYONE
  //   })

  //   const canUserSignUp = await userValidation.canUserSignUp()
  //   expect(canUserSignUp.result).toBe(true)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.MANUAL
  //   })

  //   const canUserSignUp2 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp2.result).toBe(false)


  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.REQUEST
  //   })

  //   const canUserSignUp3 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp3.result).toBe(false)

  //   await backendUserRequestSql.updateOne({
  //     type: backendSetting_backendUserRequestEnum.REQUEST_NO_PASSWORD
  //   })

  //   const canUserSignUp4 = await userValidation.canUserSignUp()
  //   expect(canUserSignUp4.result).toBe(false)
  // })

  test("doesUserHavePermission: Yes", async () => {

    const userValidation = makeBackendUserValidation(d)
    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    await userManyPermissionSql.addOne({
      userId: user.dataValues.id,
      permissionId:permission.dataValues.id
    })

    const doesUserHavePermission = await userValidation.doesUserHavePermission({
      userId: user.dataValues.id,
      permissionId: permission.dataValues.id,
    })

    expect(doesUserHavePermission.result).toBe(true)
  })

  test("doesUserHavePermission: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const doesUserHavePermission = await userValidation.doesUserHavePermission({
      userId: user.dataValues.id,
      permissionId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(doesUserHavePermission.result).toBe(false)
  })



  test("doesUserHaveRole: Yes", async () => {

    const userManyRoleSql = makeBackendUserManyRoleSql(d)
    const userValidation = makeBackendUserValidation(d)

    // const addManyPermission = 
    await userManyRoleSql.addOne({
      userId: user.dataValues.id,
      roleId: role.dataValues.id,
    })

    const doesUserHaveRole = await userValidation.doesUserHaveRole({
      userId: user.dataValues.id,
      roleId: role.dataValues.id,
    })

    expect(doesUserHaveRole.result).toBe(true)
  })

  test("doesUserHaveRole: No", async () => {

    const userValidation = makeBackendUserValidation(d)
    // const userManyPermissionSql = makeBackendUserManyPermissionSql(d)

    const doesUserHaveRole = await userValidation.doesUserHaveRole({
      userId: user.dataValues.id,
      roleId: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(doesUserHaveRole.result).toBe(false)
  })



  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})