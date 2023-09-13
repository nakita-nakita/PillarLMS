import { Model } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionCommentValidation from "../../../preMain/backendSiteDesigner_discussionComment.validation";
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../../../preMain/backendSiteDesigner_discussionVote.sql";

type input = {
  discussionId: string
}

export default function getTotalVote({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionCommentVoteSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)
    const backendDiscussionValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getTotalVote_error0004"
      })
    }

    const isIdStringFromUuid_discussionId = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })
    
    if (!isIdStringFromUuid_discussionId.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getTotalVote_error0005"
      })
    }

    const isIdValid_discussionId = await backendDiscussionValidation.isIdValid({
      id: args.discussionId
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid_discussionId.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getTotalVote_error0006"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionCommentVoteSql.getTotalVote({
      discussionId: args.discussionId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}