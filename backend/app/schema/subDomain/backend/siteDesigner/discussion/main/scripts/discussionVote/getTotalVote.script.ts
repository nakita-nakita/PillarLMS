import { Model } from "sequelize";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionVoteSql from "../../../preMain/backendSiteDesignerDiscussionVote.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  discussionId: string
}

export default function getTotalVote(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

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
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}