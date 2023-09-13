import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import makeBackendSiteDesignerSettingReadAccessValidation from "../backendSiteDesignerSetting_readAccess.validation";
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql";

//models
// import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";

//utils
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeBackendSiteDesignerSettingReadAccessSql from "../backendSiteDesignerSetting_readAccess.sql";
import backendSiteDesignerSetting_readAccess from "../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_readAccess.model";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";

jest.setTimeout(100000)

describe("test backenSiteDesignerSetting_readAccess.validation.js", () => {
  let d: d_allDomain

  let list: Model<backendSiteDesignerSetting_readAccess>[];

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
        // throwIt,
      ]
    };


    const userSql = makeBackendUserSql(d)

    const user1 = (await userSql.addOne({
      id: uuidv4()
    })).data

    const user2 = (await userSql.addOne({
      id: uuidv4()
    })).data

    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d);

    await readAccessSql.setList([
      {
        userId: user1.dataValues.id
      },
      {
        userId: user2.dataValues.id
      },
    ])

    list = (await readAccessSql.getAll()).data
  }, 100000)

  test("areIdsValid: Yes", async () => {
    const readAccessValidacation = makeBackendSiteDesignerSettingReadAccessValidation(d)

    const areIdsValid = await readAccessValidacation.areIdsValid({
      idArray: list.map(l => l.dataValues.id)
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const readAccessValidacation = makeBackendSiteDesignerSettingReadAccessValidation(d)

    const areIdsValid = await readAccessValidacation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const readAccessValidacation = makeBackendSiteDesignerSettingReadAccessValidation(d)

    const areIdsValid = await readAccessValidacation.isIdValid({
      id: list[0].dataValues.id
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("isIdValid: test should fail", async () => {
    const readAccessValidacation = makeBackendSiteDesignerSettingReadAccessValidation(d)

    const isIdValid = await readAccessValidacation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})