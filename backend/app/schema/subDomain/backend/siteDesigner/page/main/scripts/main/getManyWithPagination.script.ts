import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesigner_page.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_page> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
