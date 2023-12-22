import { Model } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../../models/subDomain/client/site/clientSitePageSectionNormal.model";
import makeClientSitePageSectionNormalSql from "../../../preMain/clientSitePageSectionNormal.sql";

type input = {
  pageId: string;
  selectionType: SelectionTypeEnum;
  selectionId: string;
  orderNumber: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
};

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {

    const sql = makeClientSitePageSectionNormalSql(d);


    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.addOne({
      pageId: args.pageId,
      orderNumber: args.orderNumber,
      webAssetImport: args.webAssetImport,
      userAnswersJsonB: args.userAnswersJsonB,
      selectionType: args.selectionType,
      selectionId: args.selectionId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}