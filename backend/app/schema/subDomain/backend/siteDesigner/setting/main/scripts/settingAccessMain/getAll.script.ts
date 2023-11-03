import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSettingAccessSql from "../../../preMain/backendSiteDesignerSetting_settingAccess.sql";
import backendSiteDesignerSetting_settingAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_settingAccess.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getAll(d: dependencies) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_settingAccess>[]>> => {

    const settingAccessSql = makeBackendSiteDesignerSettingSettingAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await settingAccessSql.getAll().catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


