import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingLinkSql from "../backendSettingLink.sql"
jest.setTimeout(100000)


describe("test backendSettingLink.sql.js", () => {
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

  test("upsertOne: can edit record.", async () => {
    const settingLink = makeBackendSettingLinkSql(d)

    const updateOne = await settingLink.upsertOne({
      description: "description",
      image: "image",
      title: "title",
      isReady: true,

    })

    expect(updateOne.data.dataValues.description).toEqual("description")
    expect(updateOne.data.dataValues.image).toEqual("image")
    expect(updateOne.data.dataValues.title).toEqual("title")
    expect(updateOne.data.dataValues.isReady).toBe(true)

  })

  test("getOne: can get record.", async () => {
    const settingLink = makeBackendSettingLinkSql(d)

    const getOne = await settingLink.getOne()

    expect(getOne.data.dataValues.description).toEqual("description")
    expect(getOne.data.dataValues.image).toEqual("image")
    expect(getOne.data.dataValues.title).toEqual("title")
    expect(getOne.data.dataValues.isReady).toBe(true)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

