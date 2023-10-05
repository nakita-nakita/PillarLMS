import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesignerDiscussion.sql";
import makeBackendSiteDesignerDiscussionValidation from "../../../preMain/backendSiteDesignerDiscussion.validation";

type input = {
  id: string,
  title?: string,
  post?: string,
  userId?: string,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_updateOne_error:0001"
      })
    }

    if (args.userId) {
      const isUserIdStringFromUuid = stringHelpers.isStringValidUuid({
        str: args.userId
      })

      if (!isUserIdStringFromUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'userId' is not UUID format.",
          errorIdentifier: "backendSiteDesignerDiscussion_updateOne_error:0002"
        })
      }
    }

    if (args.title) {
      if (args.title.length == 0) {
        return endMainFromError({
          hint: "Datapoint 'title' does not have value.",
          errorIdentifier: "backendSiteDesignerDiscussion_updateOne_error:0003"
        })
      }
    }

    if (args.post) {
      if (args.post.length == 0) {
        return endMainFromError({
          hint: "Datapoint 'post' does not have value.",
          errorIdentifier: "backendSiteDesignerDiscussion_updateOne_error:0004"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await discussionSql.updateOne({
      id: args.id,
      title: args.title,
      post: args.post,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
