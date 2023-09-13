import { Model } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionCommentValidation from "../../../preMain/backendSiteDesigner_discussionComment.validation";
import makeBackendSiteDesignerDiscussionCommentMain from "../../backendSiteDesigner_discussionComment.main";

type input = {
  id: string
}

export default function getMany({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      subDomainTransaction,
      loggers,
    }
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentMain(d)
    const backendDiscussionValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getMany_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getMany_error0002"
      })
    }

    const isIdValid = await backendDiscussionValidation.isIdValid({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_discussionComment_getMany_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionCommentSql.getMany({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}