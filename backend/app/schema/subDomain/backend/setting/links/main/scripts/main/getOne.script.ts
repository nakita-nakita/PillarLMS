import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const sql = makeBackendSettingLinkSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}