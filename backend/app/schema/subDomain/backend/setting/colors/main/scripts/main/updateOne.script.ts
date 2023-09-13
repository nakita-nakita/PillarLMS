import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingColorsSql from "../../../preMain/backendSetting_colors.sql";
import backendSetting_colors from "../../../../../../../../models/subDomain/backend/setting/backendSetting_colors.model";

type input = {
  color1?: string,
  color2?: string,
  color3?: string,
  color4?: string,
  color5?: string,
  lightBackgroundColor?: string,
  lightTextColor?: string,
  darkBackgroundColor?: string,
  darkTextColor?: string,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_colors> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const colorsSql = makeBackendSettingColorsSql(d);

    const response = await colorsSql.updateOne({
      color1: args.color1,
      color2: args.color2,
      color3: args.color3,
      color4: args.color4,
      color5: args.color5,
      lightBackgroundColor: args.lightBackgroundColor,
      lightTextColor: args.lightTextColor,
      darkBackgroundColor: args.darkBackgroundColor,
      darkTextColor: args.darkTextColor,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}