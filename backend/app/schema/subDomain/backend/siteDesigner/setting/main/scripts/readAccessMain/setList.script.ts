import { Model } from "sequelize";
import makeBackendSiteDesignerSettingReadAccessSql from "../../../preMain/backendSiteDesignerSetting_readAccess.sql";
import makeBackendSiteDesignerSettingReadAccessValidation from "../../../preMain/backendSiteDesignerSetting_readAccess.validation";
import backendSiteDesignerSetting_readAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_readAccess.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import stringHelpers from "../../../../../../../utils/stringHelpers"
import endGraphQLMainDefault from "../../../../../../../utils/graphql/endMainFromError.func";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  userId: string
}

export default function setList(d: dependencies) {

  return async (args: input[]): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_readAccess> | null>> => {

    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d)
    const readAccessValidation = makeBackendSiteDesignerSettingReadAccessValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================
    if (!args || args?.length < 1) {
      return endGraphQLMainDefault({
        hint: "No data to setList with.",
        errorIdentifier: "backendSiteDesignerSetting_readAccess_setList_error0001"
      })
    }

    const allIds = args.map(a => a.id).filter(a => a !== undefined)
    const allUserIds = args.map(a => a.userId) 

    const allUuids = [
      ...allIds,
      ...allUserIds,
    ]

    const areIdsUuids = stringHelpers.areStringsValidUuids({
      strArr: allUuids
    })

    if (!areIdsUuids.result) {
      return endGraphQLMainDefault({
        hint: "There is a malformed id or userId. It should be a UUID.",
        errorIdentifier: "backendSiteDesignerSetting_readAccess_setList_error0002"
      })
    }

    if (allIds.length) {
      const areIdsValid = await readAccessValidation.areIdsValid({
        idArray: allIds
      })

      if (!areIdsValid.result) {
        return endGraphQLMainDefault({
          hint: "There is an invalid id or userId.",
          errorIdentifier: "backendSiteDesignerSetting_readAccess_setList_error0003"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const setting = await readAccessSql.setList(args).catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


