import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../../models/subDomain/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const sql = makeBackendSettingSiteSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}