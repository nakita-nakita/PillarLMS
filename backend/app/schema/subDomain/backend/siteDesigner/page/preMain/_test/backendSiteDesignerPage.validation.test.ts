import makeBackendSiteDesignerPageSql from "../backendSiteDesignerPage.sql"
import backendSiteDesignerPage from "../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import { Model } from "sequelize";
import makeBackendSiteDesignerPageValidation from "../backendSiteDesignerPage.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendSiteDesignerPage.validation.js", () => {
  let d: dependencies;
  let page: Model<backendSiteDesignerPage>;

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

    const pageSql = makeBackendSiteDesignerPageSql(d)

    page = (await pageSql.addOne({
      // pageArray: [{
      slug: "/test/should-not-be-saved/validation/",
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

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})