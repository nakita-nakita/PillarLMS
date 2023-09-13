import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesigner_page.sql";
import makeBackendSiteDesignerPageValidation from "../../../preMain/backendSiteDesigner_page.validation";

type input = {
  id: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const pageSql = makeBackendSiteDesignerPageSql(d);
    const pageValidation = makeBackendSiteDesignerPageValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_page_deleteOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_page_deleteOne_error0002"
      })
    }

    const isIdValid = await pageValidation.isIdValid({
      id: args.id
    })


    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_page_deleteOne_error0003"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.deleteOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}