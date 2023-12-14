import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSectionNormalBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionNormalBuiltIn.sql";
import backendSiteDesignerPageSectionNormalBuiltIn from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model";


export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormalBuiltIn>[] | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalBuiltInSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}