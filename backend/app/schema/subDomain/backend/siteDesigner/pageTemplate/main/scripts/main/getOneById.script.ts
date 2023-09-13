import { Model } from "sequelize";
import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageTemplateSql from "../../../preMain/backendSiteDesigner_pageTemplate.sql";

type input = {
  id: string
}

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_pageTemplate> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const pageTemplateSql = makeBackendSiteDesignerPageTemplateSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_pageTemplate_getOneById_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_pageTemplate_getOneById_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageTemplateSql.getOneById({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}
