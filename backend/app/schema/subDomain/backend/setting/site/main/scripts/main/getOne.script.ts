import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingSiteSql from "../../../preMain/backendSetting_site.sql";
import backendSetting_site from "../../../../../../../../models/subDomain/backend/setting/backendSetting_site.model";

export default function getOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (): Promise<returningSuccessObj<Model<backendSetting_site> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const siteSql = makeBackendSettingSiteSql(d);

    const response = await siteSql.getOne().catch(error => errorHandler(error, loggers))

    return response
  }
}