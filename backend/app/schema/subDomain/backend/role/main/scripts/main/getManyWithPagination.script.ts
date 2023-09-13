import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
  roleId?: string
  userId?: string
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendRole> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const roleSql = makeBackendRoleSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await roleSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
