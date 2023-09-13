import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingLinksSql from "../../../preMain/backendSetting_links.sql";
import backendSetting_links from "../../../../../../../../models/subDomain/backend/setting/backendSetting_links.model";

export default function getOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (): Promise<returningSuccessObj<Model<backendSetting_links> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const lookUpSql = makeBackendSettingLinksSql(d);

    const response = await lookUpSql.getOne().catch(error => errorHandler(error, loggers))

    return response
  }
}