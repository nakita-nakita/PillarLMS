import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";


export default function getOne(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const sql = makeBackendSettingLinkSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}