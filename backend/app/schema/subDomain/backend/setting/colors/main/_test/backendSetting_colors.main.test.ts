import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingColorsMain from "../backendSetting_colors.main"
jest.setTimeout(100000)


describe("test backendSetting_colors.main.js", () => {
  let d: d_sub

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

  test("updateOne: backendSetting_colors can edit record.", async () => {
    const settingColors = makeBackendSettingColorsMain(d)

    const updateOne = await settingColors.updateOne({
      color1: "test",
      color2: "test",
      color3: "test",
      color4: "test",
      color5: "test",
      lightBackgroundColor: "test",
      lightTextColor: "test",
      darkBackgroundColor: "test",
      darkTextColor: "test",
    })
    console.log('updateOne', updateOne)
    expect(updateOne.data.dataValues.color1).toEqual("test")
    expect(updateOne.data.dataValues.color2).toEqual("test")
    expect(updateOne.data.dataValues.color3).toEqual("test")
    expect(updateOne.data.dataValues.color4).toEqual("test")
    expect(updateOne.data.dataValues.color5).toEqual("test")
    expect(updateOne.data.dataValues.lightBackgroundColor).toEqual("test")
    expect(updateOne.data.dataValues.lightTextColor).toEqual("test")
    expect(updateOne.data.dataValues.darkBackgroundColor).toEqual("test")
    expect(updateOne.data.dataValues.darkTextColor).toEqual("test")
  })

  test("getOne: backendSetting_colors can get record.", async () => {
    const settingColors = makeBackendSettingColorsMain(d)

    const getOne = await settingColors.getOne()
    expect(getOne.data.dataValues.color1).toEqual("test")
    expect(getOne.data.dataValues.color2).toEqual("test")
    expect(getOne.data.dataValues.color3).toEqual("test")
    expect(getOne.data.dataValues.color4).toEqual("test")
    expect(getOne.data.dataValues.color5).toEqual("test")
    expect(getOne.data.dataValues.lightBackgroundColor).toEqual("test")
    expect(getOne.data.dataValues.lightTextColor).toEqual("test")
    expect(getOne.data.dataValues.darkBackgroundColor).toEqual("test")
    expect(getOne.data.dataValues.darkTextColor).toEqual("test")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

