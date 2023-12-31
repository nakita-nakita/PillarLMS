import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendUserSql from "../../../preMain/backendUser.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<backendRole> | null>> => {

    const { errorHandler, loggers } = d

    const userSql = makeBackendUserSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await userSql.getManyWithPagination(args).catch(error => errorHandler(error, loggers))

    return response;
  }
}
