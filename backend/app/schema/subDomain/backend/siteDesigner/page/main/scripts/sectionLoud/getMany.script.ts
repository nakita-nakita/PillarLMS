import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSectionLoudSql from "../../../preMain/backendSiteDesignerPageSectionLoud.sql";
import backendSiteDesignerPageSectionLoud from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud>[] | null>> => {

    const sql = makeBackendSiteDesignerPageSectionLoudSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}