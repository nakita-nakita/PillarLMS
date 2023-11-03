import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid"
import makeBackendSiteDesignerSettingUpdateAccessValidation from "../backendSiteDesignerSetting_updateAccess.validation";
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql";
import makeBackendSiteDesignerSettingUpdateAccessSql from "../backendSiteDesignerSetting_updateAccess.sql";
import backendSiteDesignerSetting_updateAccess from "../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backenSiteDesignerSetting_updateAccess.validation.js", () => {
  let d: dependencies

  let list: Model<backendSiteDesignerSetting_updateAccess>[];

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const userSql = makeBackendUserSql(d)

    const user1 = (await userSql.addOne({
      id: uuidv4()
    })).data

    const user2 = (await userSql.addOne({
      id: uuidv4()
    })).data

    const updateAccessSql = makeBackendSiteDesignerSettingUpdateAccessSql(d);

    await updateAccessSql.setList([
      {
        userId: user1.dataValues.id
      },
      {
        userId: user2.dataValues.id
      },
    ])

    list = (await updateAccessSql.getAll()).data
  }, 100000)

  test("areIdsValid: Yes", async () => {
    const updateAccessValidacation = makeBackendSiteDesignerSettingUpdateAccessValidation(d)

    const areIdsValid = await updateAccessValidacation.areIdsValid({
      idArray: list.map(l => l.dataValues.id)
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const updateAccessValidacation = makeBackendSiteDesignerSettingUpdateAccessValidation(d)

    const areIdsValid = await updateAccessValidacation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const updateAccessValidacation = makeBackendSiteDesignerSettingUpdateAccessValidation(d)

    const areIdsValid = await updateAccessValidacation.isIdValid({
      id: list[0].dataValues.id
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("isIdValid: test should fail", async () => {
    const updateAccessValidacation = makeBackendSiteDesignerSettingUpdateAccessValidation(d)

    const isIdValid = await updateAccessValidacation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})