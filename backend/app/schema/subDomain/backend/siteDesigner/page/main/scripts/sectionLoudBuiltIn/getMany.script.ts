import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoudBuiltIn from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoudBuiltIn.model";
import makeBackendSiteDesignerPageSectionLoudBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionLoudBuiltIn.sql";


export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoudBuiltIn>[] | null>> => {

    const sql = makeBackendSiteDesignerPageSectionLoudBuiltInSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}