import backendSiteDesignerPublishRecord from "../../../../../../../../models/subDomain/backend/siteDesigner/publish/backendSiteDesignerPublishRecord.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPublishRecord.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerPublishRecord> | null>> => {

    const publishSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await publishSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
