import { Model } from "sequelize";
import makeBackendSiteDesignerSettingUpdateAccessSql from "../../../preMain/backendSiteDesignerSetting_updateAccess.sql";

//models
import backendSiteDesignerSetting_updateAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getAll({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_updateAccess>[]>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const updateAccessSql = makeBackendSiteDesignerSettingUpdateAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await updateAccessSql.getAll().catch(error => errorHandler(error, loggers))

    return setting
  }
}


