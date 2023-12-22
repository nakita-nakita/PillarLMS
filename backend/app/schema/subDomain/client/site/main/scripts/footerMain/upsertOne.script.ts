import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteFooter from "../../../../../../../models/subDomain/client/site/clientSiteFooter.model";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import makeClientSiteFooterSql from "../../../preMain/clientSiteFooter.sql";

type input = {
  id?: string
  webAssetImport?: string
  userAnswersJsonB?: string
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteFooter> | null>> => {

    const sql = makeClientSiteFooterSql(d);

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.upsertOne({
      id: args.id,
      webAssetImport: args.webAssetImport,
      userAnswersJsonB: args.userAnswersJsonB,
      selectionType: args.selectionType,
      selectionId: args.selectionId,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}