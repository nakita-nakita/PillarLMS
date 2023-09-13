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
  id: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)
    const backendDiscussionValidation = makeBackendSiteDesignerDiscussionValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussion_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussion_error0002"
      })
    }

    const isIdValid = await backendDiscussionValidation.isIdValid({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_discussion_deleteOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionSql.deleteOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}