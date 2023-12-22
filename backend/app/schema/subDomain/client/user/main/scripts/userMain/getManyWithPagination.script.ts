import clientUser from "../../../../../../../models/subDomain/client/user/clientUser.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeClientUserSql from "../../../preMain/clientUser.sql";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<findAndCountAll<clientUser> | null>> => {

    const notificationSql = makeClientUserSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await notificationSql.getManyWithPagination({
      q: args.q,
      page: args.page,
      pageSize: args.pageSize,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
