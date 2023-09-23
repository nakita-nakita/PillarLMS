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

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendNotification> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const notificationSql = makeBackendNotificationSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await notificationSql.getManyWithPagination({
      userId: args.userId,
      page: args.page,
      pageSize: args.pageSize,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}
