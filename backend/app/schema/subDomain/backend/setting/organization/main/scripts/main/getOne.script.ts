import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import makeBackendSettingChurchSql from "../../../preMain/backendSettingOrganization.sql";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";


export default function getOne(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {

    const backendUserRequestSql = makeBackendSettingOrganizationSql(d);

    const response = backendUserRequestSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}