import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingHeaderBuiltInSql from "../../../preMain/backendSettingHeaderBuiltIn.sql";
import backendSettingHeaderBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeaderBuiltIn.model";


export default function getMany(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingHeaderBuiltIn>[] | null>> => {

    const sql = makeBackendSettingHeaderBuiltInSql(d);

    const response = sql.getMany().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}