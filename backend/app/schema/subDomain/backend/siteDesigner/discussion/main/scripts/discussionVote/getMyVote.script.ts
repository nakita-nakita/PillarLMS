import { Model } from "sequelize";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionVoteSql from "../../../preMain/backendSiteDesignerDiscussionVote.sql";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";

type input = {
  userId: string
  discussionId: string
}

export default function getMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

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

    if (!args.userId) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getMyVote_error:0001"
      })
    }

    const isIdStringFromUuid_userId = stringHelpers.isStringValidUuid({
      str: args.userId
    })
    
    if (!isIdStringFromUuid_userId.result) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getMyVote_error:0001"
      })
    }

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getMyVote_error:0002"
      })
    }

    const isIdStringFromUuidDiscussionId = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })
    
    if (!isIdStringFromUuidDiscussionId.result) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_getMyVote_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionVoteSql.getMyVote({
      discussionId: args.discussionId,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}