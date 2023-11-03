import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesignerDiscussion.sql";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  title: string
  post: string
  userId: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0001"
      })
      
    }
    const isUserIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.userId
    })

    if (!isUserIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0001"
      })
    }

    if (!args.title) {
      return endMainFromError({
        hint: "Datapoint 'title' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0002"
      })
    }
    
    if (args.title.length == 0) {
      return endMainFromError({
        hint: "Datapoint 'title' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0002"
      })
    }

    if (!args.post) {
      return endMainFromError({
        hint: "Datapoint 'post' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0003"
      })
    }

    if (args.post.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'post' does not have value.",
        errorIdentifier: "backendSiteDesignerDiscussion_addOne_error:0003"
      })
    }
    
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await discussionSql.addOne({
      post: args.post,
      title: args.title,
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
