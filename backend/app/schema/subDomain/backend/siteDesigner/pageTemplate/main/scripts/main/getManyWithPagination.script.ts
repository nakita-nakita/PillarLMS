import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerPageTemplateSql from "../../../preMain/backendSiteDesigner_pageTemplate.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_pageTemplate> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const pageTemplateSql = makeBackendSiteDesignerPageTemplateSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageTemplateSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
