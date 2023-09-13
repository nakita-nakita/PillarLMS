import _ from "lodash";
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
  nickname?: string
  version?: string
  data?: object
  isReady?: boolean
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

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
        errorIdentifier: "backendSiteDesigner_page_updateOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesigner_page_updateOne_error0002"
      })
    }

    const isIdValid = await pageValidation.isIdValid({
      id: args.id
    })

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendSiteDesigner_page_updateOne_error0003"
      })
    }

    if (args.nickname) {
      if (args.nickname.length > 50) {
        return endMainFromError({
          hint: "Datapoint 'nickname' was provided but is too long. 50 character max.",
          errorIdentifier: "backendSiteDesigner_page_updateOne_error0004"
        })
      }
  
      const isNicknameTaken = await pageValidation.isNicknameTaken({
        nickname: args.nickname
      })
  
      if (!isNicknameTaken.success || isNicknameTaken.result) {
        return endMainFromError({
          hint: "Datapoint 'nickname' is taken.",
          errorIdentifier: "backendSiteDesigner_page_updateOne_error0005"
        })
      } 
    }
    
    if (args.version) {
      if (args.version.length > 25) {
        return endMainFromError({
          hint: "Datapoint 'version' length is too long. 25 character max.",
          errorIdentifier: "backendSiteDesigner_page_updateOne_error0006"
        })
      }
    }


    if (args.data) {
      if (Object.getOwnPropertyNames(args.data).length === 0) {
        return endMainFromError({
          hint: "Datapoint 'data' was provided but is empty object.",
          errorIdentifier: "backendSiteDesigner_page_updateOne_error0007"
        })
      }
    }


    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.updateOne(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}