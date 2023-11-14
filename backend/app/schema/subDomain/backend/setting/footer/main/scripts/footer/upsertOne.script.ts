import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooter from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooter.model";
import makeBackendSettingFooterSql from "../../../preMain/backendSettingFooter.sql";

type input = {
  id?: string
  webAssetImport?: string
  menuJsonB?: string
  userAnswersJsonB?: string
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooter> | null>> => {

    const sql = makeBackendSettingFooterSql(d);

    const response = sql.upsertOne({
      id: args.id,
      webAssetImport: args.webAssetImport,
      menuJsonB: args.menuJsonB,
      userAnswersJsonB: args.userAnswersJsonB,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}