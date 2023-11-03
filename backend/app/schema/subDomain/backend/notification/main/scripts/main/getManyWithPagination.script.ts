import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
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

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendNotification> | null>> => {

    const notificationSql = makeBackendNotificationSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await notificationSql.getManyWithPagination({
      userId: args.userId,
      page: args.page,
      pageSize: args.pageSize,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
