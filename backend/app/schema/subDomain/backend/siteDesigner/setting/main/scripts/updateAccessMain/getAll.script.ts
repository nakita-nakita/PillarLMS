import { Model } from "sequelize";
import makeBackendSiteDesignerSettingUpdateAccessSql from "../../../preMain/backendSiteDesignerSetting_updateAccess.sql";
import backendSiteDesignerSetting_updateAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getAll(d: dependencies) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_updateAccess>[]>> => {


    const updateAccessSql = makeBackendSiteDesignerSettingUpdateAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await updateAccessSql.getAll().catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


