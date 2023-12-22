import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionLoud from "../../../../../../../models/subDomain/client/site/clientSitePageSectionLoud.model";
import makeClientSitePageSectionLoudSql from "../../../preMain/clientSitePageSectionLoud.sql";
import { sameDocMenuType } from "../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script";

type Input = {
  pageId: string;
  id?: string;
  webAssetImport?: string
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<clientSitePageSectionLoud> | null>> => {

    const sql = makeClientSitePageSectionLoudSql(d);

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.upsertOne({
      id: args.id,
      pageId: args.pageId,
      webAssetImport: args.webAssetImport,
      userAnswersJsonB: args.userAnswersJsonB,
      selectionType: args.selectionType,
      selectionId: args.selectionId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}