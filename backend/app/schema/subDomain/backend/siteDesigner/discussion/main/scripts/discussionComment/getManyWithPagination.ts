import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import backendSiteDesignerDiscussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import makeBackendSiteDesignerDiscussionCommentSql from "../../../preMain/backendSiteDesignerDiscussionComment.sql";

type input = {
  discussionId: string
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerDiscussionComment>>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_getManyWithPagination_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_getManyWithPagination_error:0001"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionCommentSql.getManyWithPagination({
      discussionId: args.discussionId,
      page: args.page,
      pageSize: args.pageSize,
      q: args.q,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}