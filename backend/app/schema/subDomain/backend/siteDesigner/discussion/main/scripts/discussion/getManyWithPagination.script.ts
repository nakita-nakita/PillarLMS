import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";
import { backendSiteDesigner_discussion_getManyWithPaginationTypeEnum } from "../../../preMain/scripts/sql/getManyWithPagination.script"

type input = {
  page?: number
  pageSize?: number
  type: backendSiteDesigner_discussion_getManyWithPaginationTypeEnum
}

export default function getManyWithPagination({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
