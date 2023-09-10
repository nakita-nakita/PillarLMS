import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_colors from "../../../../../../../../models/subDomain/backend/setting/backendSetting_colors.model";
import makeBackendSettingColorsSql from "../../../preMain/backendSetting_colors.sql";

export default function getOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  return async (): Promise<returningSuccessObj<Model<backendSetting_colors> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const colorsSql = makeBackendSettingColorsSql(d);

    const response = await colorsSql.getOne().catch(error => errorHandler(error, loggers))

    return response
  }
}