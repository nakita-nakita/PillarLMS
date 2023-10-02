import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";


export default function viewTrashed({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (): Promise<returningSuccessObj<findAndCountAll<backendMediaManagerFile>[] | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    // none

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await fileSql.viewTrashed().catch(error => errorHandler(error, loggers))

    return response;
  }
}
