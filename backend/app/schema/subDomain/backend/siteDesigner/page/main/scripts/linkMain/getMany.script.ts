import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageLink from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageLink.model";
import makeBackendSiteDesignerPageLinkSql from "../../../preMain/backendSiteDesignerPageLink.sql";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageLink>[] | null>> => {

    const sql = makeBackendSiteDesignerPageLinkSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}