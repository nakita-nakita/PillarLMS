import { Model } from "sequelize";
import makeBackendSiteDesignerSettingReadAccessSql from "../../../preMain/backendSiteDesignerSetting_readAccess.sql";

//models
import backendSiteDesignerSetting_readAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_readAccess.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getAll({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_readAccess>[]>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await readAccessSql.getAll().catch(error => errorHandler(error, loggers))

    return setting
  }
}


