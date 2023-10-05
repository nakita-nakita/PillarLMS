import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesignerDiscussion.sql";
import { backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum } from "../../../preMain/scripts/discussionSql/getManyWithPagination.script"

type input = {
  page?: number
  pageSize?: number
  type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerDiscussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
