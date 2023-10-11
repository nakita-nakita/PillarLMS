import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import makeBackendSettingChurchSql from "../../../preMain/backendSettingOrganization.sql";

export default function getOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const backendUserRequestSql = makeBackendSettingChurchSql(d);
    
    const response = backendUserRequestSql.getOne().catch(error => errorHandler(error, loggers))

    return response
  }
}