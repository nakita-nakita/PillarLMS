import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesignerDiscussion.sql";
import { backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum } from "../../../preMain/scripts/discussionSql/getManyWithPagination.script"

type input = {
  page?: number
  pageSize?: number
  type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum
}

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerDiscussion> | null>> => {

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
