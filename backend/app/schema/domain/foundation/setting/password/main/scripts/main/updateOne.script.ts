import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";
import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
import makeFoundationSettingPasswordSql from "../../../preMain/foundationSetting_password.sql";

type input = {
  passwordLength?: number
  shouldHaveUppercaseLetter?: boolean
  shouldHaveLowercaseLetter?: boolean
  shouldHaveNumber?: boolean
  shouldHaveSymbol?: boolean
}

export default function updateOne(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationSetting_password> | null>> => {

    const passwordSql = makeFoundationSettingPasswordSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await passwordSql.updateOne({
      passwordLength: args.passwordLength,
      shouldHaveLowercaseLetter: args.shouldHaveLowercaseLetter,
      shouldHaveNumber: args.shouldHaveNumber,
      shouldHaveSymbol: args.shouldHaveSymbol,
      shouldHaveUppercaseLetter: args.shouldHaveUppercaseLetter,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
