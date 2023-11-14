import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingFooterBuiltInSql from "../../../preMain/backendSettingFooterBuiltIn.sql";
import backendSettingFooterBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooterBuiltIn.model";


export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingFooterBuiltIn>[] | null>> => {

    const sql = makeBackendSettingFooterBuiltInSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}