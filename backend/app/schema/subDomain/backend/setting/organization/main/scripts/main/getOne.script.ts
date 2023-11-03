import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import makeBackendSettingChurchSql from "../../../preMain/backendSettingOrganization.sql";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";
import backendSettingOrganization from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {

    const backendUserRequestSql = makeBackendSettingOrganizationSql(d);

    const response = backendUserRequestSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}