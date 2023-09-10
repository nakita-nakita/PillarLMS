import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
  roleId?: string
  userId?: string
}

export default function getManyWithPagination({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendNotification> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const notificationSql = makeBackendNotificationSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await notificationSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
