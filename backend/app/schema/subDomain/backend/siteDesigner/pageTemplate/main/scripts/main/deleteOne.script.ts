import { Model } from "sequelize";
import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageTemplateSql from "../../../preMain/backendSiteDesigner_pageTemplate.sql";
import makeBackendSiteDesignerPageTemplateValidation from "../../../preMain/backendSiteDesigner_pageTemplate.validation";

type input = {
  id: string
}

export default function deleteOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_pageTemplate> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const pageTemplateSql = makeBackendSiteDesignerPageTemplateSql(d);
    const pageTemplateValidation = makeBackendSiteDesignerPageTemplateValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_pageTemplate_deleteOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_pageTemplate_deleteOne_error0002"
      })
    }

    const isIdValid = await pageTemplateValidation.isIdValid({
      id: args.id
    })


    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_pageTemplate_deleteOne_error0003"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageTemplateSql.deleteOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}