import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { Model } from "sequelize";
import { d_allDomain, d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserMain from "../../backendUser.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import makeBackendUserManyRoleMain from "../../backendUserManyRole.main";
import { addOneBackendUserResponse } from "../../scripts/main/addOne.script";
import makeBackendUserBasicViewMain from "../../backendUserBasicView.main";
import makeBackendUserProfileMain from "../../backendUserProfile.main";


jest.setTimeout(100000)


describe("test backendUserManyRole.main.js", () => {
  let d: d_allDomain
  let dd: d_domain
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

    dd ={
      domainDb,
      transaction: domainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt
      ],
    }

    const backendUserMain = makeBackendUserMain(d)

    let uuid = uuidv4();

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
    const backendUserBasicViewMain = makeBackendUserProfileMain(dd)

    const me = await backendUserBasicViewMain.getOneById({
      id: user.id
    })
    expect(me.success).toBe(true)
  })

  test("updateOne: makeBackendUserProfile.", async () => {
    const backendUserBasicViewMain = makeBackendUserProfileMain(dd)

    const me = await backendUserBasicViewMain.updateOne({
      id: user.id,
      // add values later
    })
    expect(me.success).toBe(true)
  })

  afterAll(async () => {
    await d.subDomaintransaction.rollback();
    await d.domainTransaction.rollback();
  })
})