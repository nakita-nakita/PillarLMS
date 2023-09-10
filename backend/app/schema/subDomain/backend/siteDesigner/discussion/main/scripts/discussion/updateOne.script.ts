import { Model } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";
import makeBackendSiteDesignerDiscussionValidation from "../../../preMain/backendSiteDesigner_discussion.validation";

type input = {
  id: string,
  title?: string,
  post?: string,
  userId?: string,
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d);
    const discussionValidation = makeBackendSiteDesignerDiscussionValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussion_updateOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussion_updateOne_error0002"
      })
    }

    const isIdValid = await discussionValidation.isIdValid({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_discussion_updateOne_error0003"
      })
    }

    // if (!args.name) {
    //   return endMainFromError({
    //     hint: "Datapoint 'name' is missing.",
    //     errorIdentifier: "backendRole_updateOne_error0004"
    //   })
    // }

    // if (args.name.length > 50) {
    //   return endMainFromError({
    //     hint: "Datapoint 'name' is too long. 50 character max.",
    //     errorIdentifier: "backendRole_updateOne_error0005"
    //   })
    // }

    // const isNameTaken = await discussionValidation.isNameTaken({
    //   name: args.name
    // }).catch(error => errorHandler(error, loggers))

    // if (isNameTaken.result) {
    //   return endMainFromError({
    //     hint: "Datapoint 'name' is already taken. Please select a new name.",
    //     errorIdentifier: "backendRole_updateOne_error0006"
    //   })
    // }

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
