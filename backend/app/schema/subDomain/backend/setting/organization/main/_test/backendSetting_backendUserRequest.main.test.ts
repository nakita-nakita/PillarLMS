import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingChurchMain from "../backendSettingOrganization.main";

jest.setTimeout(100000)

describe("test backendSetting_church.main.js", () => {
  let d: d_sub;

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("updateOne: backendSetting_church can update record.", async () => {
    const churchMain = makeBackendSettingChurchMain(d)

    const updateOne = await churchMain.updateOne({
      logo: "test",
      streetAddress: "123 fake st",
      suiteNumber: "C",
      zipCode: "11111",
      city: "fake city",
      state: "Texas",
      socialTwitter: "test",
      socialFacebook: "test",
      socialInstagram: "test",
      socialWhatsapp: "test",
      socialTelegram: "test",
    })
    expect(updateOne.data.dataValues.logo).toEqual("test")
    expect(updateOne.data.dataValues.streetAddress).toEqual("123 fake st")
    expect(updateOne.data.dataValues.suiteNumber).toEqual("C")
    expect(updateOne.data.dataValues.zipCode).toEqual("11111")
    expect(updateOne.data.dataValues.city).toEqual("fake city")
    expect(updateOne.data.dataValues.state).toEqual("Texas")
    expect(updateOne.data.dataValues.socialTwitter).toEqual("test")
    expect(updateOne.data.dataValues.socialFacebook).toEqual("test")
    expect(updateOne.data.dataValues.socialFacebook).toEqual("test")
    expect(updateOne.data.dataValues.socialFacebook).toEqual("test")
    expect(updateOne.data.dataValues.socialFacebook).toEqual("test")
  })

  test("getOne: backendSetting_church can get record.", async () => {
    const backendUserRequestLogic = makeBackendSettingChurchMain(d)

    const getOne = await backendUserRequestLogic.getOne()

    expect(getOne.data.dataValues.logo).toEqual("test")
    expect(getOne.data.dataValues.streetAddress).toEqual("123 fake st")
    expect(getOne.data.dataValues.suiteNumber).toEqual("C")
    expect(getOne.data.dataValues.zipCode).toEqual("11111")
    expect(getOne.data.dataValues.city).toEqual("fake city")
    expect(getOne.data.dataValues.state).toEqual("Texas")
    expect(getOne.data.dataValues.socialTwitter).toEqual("test")
    expect(getOne.data.dataValues.socialFacebook).toEqual("test")
    expect(getOne.data.dataValues.socialFacebook).toEqual("test")
    expect(getOne.data.dataValues.socialFacebook).toEqual("test")
    expect(getOne.data.dataValues.socialFacebook).toEqual("test")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

