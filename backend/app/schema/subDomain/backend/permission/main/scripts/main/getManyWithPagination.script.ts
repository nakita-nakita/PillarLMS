import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
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

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendPermission> | null>> => {

    const permissionSql = makeBackendPermissionSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await permissionSql.getManyWithPagination(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
