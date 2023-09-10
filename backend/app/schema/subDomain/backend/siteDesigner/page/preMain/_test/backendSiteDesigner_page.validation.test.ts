import { Sequelize } from "sequelize-typescript";
import makeBackendSiteDesignerPageSql from "../backendSiteDesigner_page.sql"
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import backendSiteDesigner_page from "../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { Model } from "sequelize";
import makeBackendSiteDesignerPageValidation from "../backendSiteDesigner_page.validation";
jest.setTimeout(100000)

describe("test backendSiteDesigner_page.validation.js", () => {
  let d: d_sub;
  let page: Model<backendSiteDesigner_page>;

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const transaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      transaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const pageSql = makeBackendSiteDesignerPageSql(d)

    page = (await pageSql.addOne({
      // pageArray: [{
      nickname: "Awesome Page!",
      data: { awesome: "awesome" },
      version: "1",
      isReady: false,
      // }],
    })).data

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const areIdsValid = await pageValidation.areIdsValid({
      idArray: [page.dataValues.id],
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const areIdsValid = await pageValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const isIdValid = await pageValidation.isIdValid({
      id: page.dataValues.id,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const isIdValid = await pageValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("isNicknameTaken: Yes", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const isNameTaken = await pageValidation.isNicknameTaken({
      nickname: page.dataValues.nickname
    })

    expect(isNameTaken.result).toBe(true);
  })

  test("isNicknameTaken: No", async () => {
    const pageValidation = makeBackendSiteDesignerPageValidation(d)

    const isIdValid = await pageValidation.isNicknameTaken({
      nickname: "This is a fake name.",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})