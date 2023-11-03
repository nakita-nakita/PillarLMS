import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../../models/subDomain/backend/setting/backendSettingColors.model";
import makeBackendSettingColorsSql from "../../../preMain/backendSettingColors.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const sql = makeBackendSettingColorsSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}