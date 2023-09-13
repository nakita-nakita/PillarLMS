import { Model } from "sequelize";
import makeBackendSiteDesignerSettingUpdateAccessSql from "../../../preMain/backendSiteDesignerSetting_updateAccess.sql";
import makeBackendSiteDesignerSettingUpdateAccessValidation from "../../../preMain/backendSiteDesignerSetting_updateAccess.validation";

//models
import backendSiteDesignerSetting_updateAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import stringHelpers from "../../../../../../../utils/stringHelpers"
import endGraphQLMainDefault from "../../../../../../../utils/graphql/endMainFromError.func";

type input = {
  id?: string
  userId: string
}

export default function setList({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (args: input[]): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_updateAccess> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const updateAccessSql = makeBackendSiteDesignerSettingUpdateAccessSql(d)
    const updateAccessValidation = makeBackendSiteDesignerSettingUpdateAccessValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================
    if (args.length < 1) {
      return endGraphQLMainDefault({
        hint: "No data to setList with.",
        errorIdentifier: "backendSiteDesignerSetting_updateAccess_setList_error0001"
      })
    }

    const allIds = args.map(a => a.id).filter(a => a !== undefined)

    const allUuids = [
      ...allIds,
      ...args.map(a => a.userId),
    ]

    const areIdsUuids = stringHelpers.areStringsValidUuids({
      strArr: allUuids
    })

    if (!areIdsUuids.result) {
      return endGraphQLMainDefault({
        hint: "There is a malformed id or userId. It should be a UUID.",
        errorIdentifier: "backendSiteDesignerSetting_updateAccess_setList_error0002"
      })
    }

    if (allIds.length) {
      const areIdsValid = await updateAccessValidation.areIdsValid({
        idArray: allIds
      })

      if (!areIdsValid.result) {
        return endGraphQLMainDefault({
          hint: "There is an invalid id or userId.",
          errorIdentifier: "backendSiteDesignerSetting_updateAccess_setList_error0003"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const setting = await updateAccessSql.setList(args).catch(error => errorHandler(error, loggers))

    return setting
  }
}


