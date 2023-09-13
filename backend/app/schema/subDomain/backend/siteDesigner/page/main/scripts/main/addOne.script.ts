import _ from "lodash";
import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesigner_page.sql";
import makeBackendSiteDesignerPageValidation from "../../../preMain/backendSiteDesigner_page.validation";

type input = {
  nickname: string
  version: string
  data: object
  isReady?: boolean
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    const d = {
      subDomainDb,
      subDomainTransaction,
      errorHandler,
      loggers,
    }
    const pageSql = makeBackendSiteDesignerPageSql(d);
    const pageValidation = makeBackendSiteDesignerPageValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.nickname) {
      return endMainFromError({
        hint: "Datapoint 'nickname' not provided.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0001"
      })
    }

    if (args.nickname.length > 50) {
      return endMainFromError({
        hint: "Datapoint 'nickname' length is too long. 50 character max.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0002"
      })
    }

    const isNicknameTaken = await pageValidation.isNicknameTaken({
      nickname: args.nickname
    })

    if (!isNicknameTaken.success || isNicknameTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'nickname' is taken.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0003"
      })
    }

    if (!args.version) {
      return endMainFromError({
        hint: "Datapoint 'version' not provided.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0004"
      })
    }

    if (args.version.length > 25) {
      return endMainFromError({
        hint: "Datapoint 'version' length is too long. 25 character max.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0005"
      })
    }

    if (!args.data) {
      return endMainFromError({
        hint: "Datapoint 'data' not provided.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0006"
      })
    }

    if (Object.getOwnPropertyNames(args.data).length === 0) {
      return endMainFromError({
        hint: "Datapoint 'data' not provided.",
        errorIdentifier: "backendSiteDesigner_page_addOne_error0007"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}