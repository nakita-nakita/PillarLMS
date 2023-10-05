import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionCommentSql from "../../../preMain/backendSiteDesignerDiscussionComment.sql";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import backendSiteDesignerDiscussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";

type input = {
  post: string
  userId: string
  discussionId: string
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionComment> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0001"
      })
    }

    if (!args.userId) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0002"
      })
    }

    const isUserIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.userId
    })

    if (!isUserIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0002"
      })
    }

    if (!args.post) {
      return endMainFromError({
        hint: "Datapoint 'post' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0003"
      })
    }

    if (args.post.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'post' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_addOne_error:0003"
      })
    }
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await discussionCommentSql.addOne({
      post: args.post,
      discussionId: args.discussionId,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
