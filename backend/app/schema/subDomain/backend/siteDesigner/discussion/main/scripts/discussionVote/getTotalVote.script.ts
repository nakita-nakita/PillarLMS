import { Model } from "sequelize";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionVoteSql from "../../../preMain/backendSiteDesignerDiscussionVote.sql";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";

type input = {
  discussionId: string
}

export default function getTotalVote({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionVoteSql = makeBackendSiteDesignerDiscussionVoteSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getTotalVote_error:0001"
      })
    }

    const isIdStringFromUuidDiscussionId = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })
    
    if (!isIdStringFromUuidDiscussionId.result) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getTotalVote_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionVoteSql.getTotalVote({
      discussionId: args.discussionId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}