import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSql from "../../../preMain/backendSiteDesignerSetting.sql";

//models
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const settingSql = makeBackendSiteDesignerSettingSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await settingSql.getOne().catch(error => errorHandler(error, loggers))

    return setting
  }
}


