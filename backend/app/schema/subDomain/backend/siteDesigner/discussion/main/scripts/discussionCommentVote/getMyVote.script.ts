import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionVoteSql from "../../../preMain/backendSiteDesignerDiscussionCommentVote.sql";
import backendSiteDesignerDiscussionCommentVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionCommentVote.model";
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../../../preMain/backendSiteDesignerDiscussionCommentVote.sql";

type input = {
  userId: string
  commentId: string
}

export default function getMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionCommentVote> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const commentVoteSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getMyVote_error:0001"
      })
    }

    const isIdStringFromUuid_userId = stringHelpers.isStringValidUuid({
      str: args.userId
    })
    
    if (!isIdStringFromUuid_userId.result) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getMyVote_error:0001"
      })
    }

    if (!args.commentId) {
      return endMainFromError({
        hint: "Datapoint 'commentId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getMyVote_error:0002"
      })
    }

    const isIdStringFromUuid_commentId = stringHelpers.isStringValidUuid({
      str: args.commentId
    })
    
    if (!isIdStringFromUuid_commentId.result) {
      return endMainFromError({
        hint: "Datapoint 'commentId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getMyVote_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await commentVoteSql.getMyVote({
      commentId: args.commentId,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}