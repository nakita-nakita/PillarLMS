import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageBrowserSql from "../../../preMain/backendSiteDesignerPageBrowser.sql";
import backendSiteDesignerPageBrowser from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageBrowser.model";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageBrowser>[] | null>> => {

    const sql = makeBackendSiteDesignerPageBrowserSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}