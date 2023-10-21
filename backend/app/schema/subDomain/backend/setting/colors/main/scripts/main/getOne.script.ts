import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../../models/subDomain/backend/setting/backendSettingColors.model";
import makeBackendSettingColorsSql from "../../../preMain/backendSettingColors.sql";


export default function getOne(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const sql = makeBackendSettingColorsSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}