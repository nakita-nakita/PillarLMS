import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageTemplateMain from "../../backendSiteDesigner_pageTemplate.main";
// import { errorHandler } from "../../../../../utils";
// import makeBackendSiteDesignerPageTemplateValidation from "../backendSiteDesigner_pageTemplate.validation"
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
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

  test("backendSiteDesigner_pageTemplate_getOneById_error0001: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const getOneById = await pageTemplateMain.getOneById({
      id: ""
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendSiteDesigner_pageTemplate_getOneById_error0001")
  })

  test("backendSiteDesigner_pageTemplate_getOneById_error0002: works", async () => {
    const pageTemplateMain = makeBackendSiteDesignerPageTemplateMain(d)

    const getOneById = await pageTemplateMain.getOneById({

      id: "This is a UUID"
    })

    expect(getOneById.success).toBe(false)
    expect(getOneById.errorIdentifier).toEqual("backendSiteDesigner_pageTemplate_getOneById_error0002")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})