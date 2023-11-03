import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
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

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendRole> | null>> => {

    const roleSql = makeBackendRoleSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await roleSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
