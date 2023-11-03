import { Model } from "sequelize";
import makeBackendSiteDesignerSettingReadAccessSql from "../../../preMain/backendSiteDesignerSetting_readAccess.sql";
import backendSiteDesignerSetting_readAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_readAccess.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getAll(d: dependencies) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_readAccess>[]>> => {

    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await readAccessSql.getAll().catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


