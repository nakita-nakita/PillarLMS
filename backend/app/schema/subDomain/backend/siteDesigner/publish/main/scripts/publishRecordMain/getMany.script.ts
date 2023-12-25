import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPublishRecord from "../../../../../../../../models/subDomain/backend/siteDesigner/publish/backendSiteDesignerPublishRecord.model";
import makeBackendSiteDesignerPublishRecordSql from "../../../preMain/backendSiteDesignerPublishRecord.sql";

export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPublishRecord>[] | null>> => {

    const sql = makeBackendSiteDesignerPublishRecordSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}