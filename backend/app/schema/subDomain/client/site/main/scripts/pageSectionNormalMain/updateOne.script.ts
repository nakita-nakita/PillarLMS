import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../../models/subDomain/client/site/clientSitePageSectionNormal.model";
import makeClientSitePageSectionNormalSql from "../../../preMain/clientSitePageSectionNormal.sql";
import { sameDocMenuType } from "../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script";

type input = {
  id: string;
  pageId?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {

    const sql = makeClientSitePageSectionNormalSql(d);


    const response = sql.updateOne({
      id: args.id,
      pageId: args.pageId,
      webAssetImport: args.webAssetImport,
      userAnswersJsonB: args.userAnswersJsonB,
      selectionType: args.selectionType,
      selectionId: args.selectionId,
      orderNumber: args.orderNumber,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}