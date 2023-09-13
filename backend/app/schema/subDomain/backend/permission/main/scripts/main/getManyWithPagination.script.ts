import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
  roleId?: string
  userId?: string
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendPermission> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const permissionSql = makeBackendPermissionSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await permissionSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
