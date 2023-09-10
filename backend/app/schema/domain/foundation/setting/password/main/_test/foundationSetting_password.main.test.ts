import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeFoundationSettingPassword from "../foundationSetting_password.main"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
jest.setTimeout(100000)


describe("test foundationSetting_password.main.js", () => {
  let d: d_domain;

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const transaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      domainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("updateOne: foundationSetting_password can add record.", async () => {
    const settingPassword = makeFoundationSettingPassword(d)

    const updateOne = await settingPassword.updateOne({
      passwordLength: 8,
      shouldHaveLowercaseLetter: false,
      shouldHaveNumber: false,
      shouldHaveSymbol: false,
      shouldHaveUppercaseLetter: false,
    })
    expect(updateOne.data.dataValues.passwordLength).toEqual(8)
    expect(updateOne.data.dataValues.shouldHaveLowercaseLetter).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveNumber).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveSymbol).toBe(false)
    expect(updateOne.data.dataValues.shouldHaveUppercaseLetter).toBe(false)
  })

  test("getOne: foundationSetting_password can add record.", async () => {
    const settingPassword = makeFoundationSettingPassword(d)

    const getOne = await settingPassword.getOne()
    expect(getOne.data.dataValues.passwordLength).toEqual(8)
  })
  
  afterAll(async () => {
    await d.transaction.rollback();
  })
})

