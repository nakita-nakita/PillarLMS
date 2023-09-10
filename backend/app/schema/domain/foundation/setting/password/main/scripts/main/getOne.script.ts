import { Model } from "sequelize";
import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeFoundationSettingPasswordSql from "../../../preMain/foundationSetting_password.sql";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";

export default function getOne(d: d_domain) {
  return async (): Promise<returningSuccessObj<Model<foundationSetting_password> | null>> => {

    const passwordSql = makeFoundationSettingPasswordSql(d);

    const response = await passwordSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}