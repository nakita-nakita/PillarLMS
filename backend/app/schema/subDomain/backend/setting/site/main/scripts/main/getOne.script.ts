import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../../models/subDomain/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";


export default function getOne(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const sql = makeBackendSettingSiteSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}