import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingLinksMain from "../backendSetting_links.main";

jest.setTimeout(100000)

describe("test backendSetting_links.main.js", () => {
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

  test("updateOne: backendSetting_links can add record.", async () => {
    const linksMain = makeBackendSettingLinksMain(d)

    const updateOne = await linksMain.updateOne({
      donationLink: "test",
      virtualServicesLink: "test",
      defaultMetaPicture: "test",
      defaultMetaTitle: "test",
      defaultMetaDescription: "test",

    })
    expect(updateOne.data.dataValues.donationLink).toEqual("test")
    expect(updateOne.data.dataValues.virtualServicesLink).toEqual("test")
    expect(updateOne.data.dataValues.defaultMetaPicture).toEqual("test")
    expect(updateOne.data.dataValues.defaultMetaTitle).toEqual("test")
    expect(updateOne.data.dataValues.defaultMetaDescription).toEqual("test")
  })

  test("getOne: backendSetting_links can get record.", async () => {
    const linksMain = makeBackendSettingLinksMain(d)

    const getOne = await linksMain.getOne()
    expect(getOne.data.dataValues.donationLink).toEqual("test")
    expect(getOne.data.dataValues.virtualServicesLink).toEqual("test")
    expect(getOne.data.dataValues.defaultMetaPicture).toEqual("test")
    expect(getOne.data.dataValues.defaultMetaTitle).toEqual("test")
    expect(getOne.data.dataValues.defaultMetaDescription).toEqual("test")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

