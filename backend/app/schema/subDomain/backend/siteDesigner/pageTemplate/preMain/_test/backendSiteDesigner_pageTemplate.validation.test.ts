import { Sequelize } from "sequelize-typescript";
import makeBackendSiteDesignerPageTemplateSql from "../backendSiteDesigner_pageTemplate.sql"
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import backendSiteDesigner_pageTemplate from "../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import { Model } from "sequelize";
import makeBackendSiteDesignerPageTemplateValidation from "../backendSiteDesigner_pageTemplate.validation";
jest.setTimeout(100000)

describe("test backendSiteDesigner_pageTemplate.validation.js", () => {
  let d: d_sub;
  let pageTemplate: Model<backendSiteDesigner_pageTemplate>;

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

    const pageTemplateSql = makeBackendSiteDesignerPageTemplateSql(d)

    pageTemplate = (await pageTemplateSql.addOne({
      // pageArray: [{
      nickname: "Awesome PageTemplate!",
      data: { awesome: "awesome" },
      version: "1",
      isReady: false,
      // }],
    })).data

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const areIdsValid = await pageTemplateValidation.areIdsValid({
      idArray: [pageTemplate.dataValues.id],
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const areIdsValid = await pageTemplateValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const isIdValid = await pageTemplateValidation.isIdValid({
      id: pageTemplate.dataValues.id,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const isIdValid = await pageTemplateValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("isNicknameTaken: Yes", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const isNameTaken = await pageTemplateValidation.isNicknameTaken({
      nickname: pageTemplate.dataValues.nickname
    })

    expect(isNameTaken.result).toBe(true);
  })

  test("isNicknameTaken: No", async () => {
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d)

    const isIdValid = await pageTemplateValidation.isNicknameTaken({
      nickname: "This is a fake name.",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    await d.transaction.rollback();
  })
})