import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingOrganizationMain from "../backendSettingOrganization.main";
jest.setTimeout(100000)

describe("test backkendSettingOrganization.main.js", () => {
  let d: d_allDomain;
  let recordId: string;

  beforeAll(async () => {
    const domainDb : Sequelize =await emptyTestSubdomainDb()
    const domainTransaction = await domainDb.transaction()
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

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
  }, 100000)

  test("updateOne:can upsert record.", async () => {
    const organizationMain = makeBackendSettingOrganizationMain(d)

    const updateOne = await organizationMain.upsertOne({
      logo: "logo",
      name: "name",
      addressLine1: "addressLine1",
      addressLine2: "addressLine2",
      cityLocality: "cityLocality",
      postalCode: "postalCode",
      shouldApplyToTopNavMenu: true,
      socialFacebook: "socialFacebook",
      socialInstagram: "socialInstagram",
      socialLinkedIn: "socialLinkedIn",
      socialPinterest: "socialPinterest",
      socialReddit: "socialReddit",
      socialWhatsapp: "socialWhatsapp",
      socialX: "socialX",
      socialYouTube: "socialYouTube",
      stateProvinceRegion: "stateProvinceRegion",
    })
    recordId = updateOne.data.dataValues.id
    expect(updateOne.data.dataValues.logo).toEqual("logo")
    expect(updateOne.data.dataValues.name).toEqual("name")
    expect(updateOne.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(updateOne.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(updateOne.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(updateOne.data.dataValues.shouldApplyToTopNavMenu).toBe(true)
    expect(updateOne.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(updateOne.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(updateOne.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(updateOne.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(updateOne.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(updateOne.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(updateOne.data.dataValues.socialX).toEqual("socialX")
    expect(updateOne.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(updateOne.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")
  })

  test("getOne: backendSettingOrganization can get record.", async () => {
    const backendUserRequestLogic = makeBackendSettingOrganizationMain(d)

    const getOne = await backendUserRequestLogic.getOne()

    expect(getOne.data.dataValues.logo).toEqual("logo")
    expect(getOne.data.dataValues.name).toEqual("name")
    expect(getOne.data.dataValues.addressLine1).toEqual("addressLine1")
    expect(getOne.data.dataValues.addressLine2).toEqual("addressLine2")
    expect(getOne.data.dataValues.cityLocality).toEqual("cityLocality")
    expect(getOne.data.dataValues.shouldApplyToTopNavMenu).toBe(true)
    expect(getOne.data.dataValues.socialFacebook).toEqual("socialFacebook")
    expect(getOne.data.dataValues.socialInstagram).toEqual("socialInstagram")
    expect(getOne.data.dataValues.socialLinkedIn).toEqual("socialLinkedIn")
    expect(getOne.data.dataValues.socialPinterest).toEqual("socialPinterest")
    expect(getOne.data.dataValues.socialReddit).toEqual("socialReddit")
    expect(getOne.data.dataValues.socialWhatsapp).toEqual("socialWhatsapp")
    expect(getOne.data.dataValues.socialX).toEqual("socialX")
    expect(getOne.data.dataValues.socialYouTube).toEqual("socialYouTube")
    expect(getOne.data.dataValues.stateProvinceRegion).toEqual("stateProvinceRegion")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

