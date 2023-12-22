import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPage>[] | null>> => {

    const sql = makeBackendSiteDesignerPageSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}