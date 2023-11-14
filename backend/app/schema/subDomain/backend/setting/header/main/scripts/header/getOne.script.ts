import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingHeader from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import makeBackendSettingHeaderSql from "../../../preMain/backendSettingHeader.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingHeader> | null>> => {

    const sql = makeBackendSettingHeaderSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}