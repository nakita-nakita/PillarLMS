import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";


export default function viewTrashed(d: dependencies) {
  return async (): Promise<returningSuccessObj<findAndCountAll<backendMediaManagerFile>[] | null>> => {

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    // none

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await fileSql.viewTrashed().catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
