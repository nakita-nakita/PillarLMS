import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSettingAccessSql from "../../../preMain/backendSiteDesignerSetting_settingAccess.sql";

//models
import backendSiteDesignerSetting_settingAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_settingAccess.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getAll({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_settingAccess>[]>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    };

    const settingAccessSql = makeBackendSiteDesignerSettingSettingAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await settingAccessSql.getAll().catch(error => errorHandler(error, loggers))

    return setting
  }
}


