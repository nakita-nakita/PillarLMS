import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesigner_page.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_page> | null>> => {

    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
