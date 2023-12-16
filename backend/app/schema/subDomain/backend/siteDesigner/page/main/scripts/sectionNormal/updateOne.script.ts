import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageSectionNormalSql from "../../../preMain/backendSiteDesignerPageSectionNormal.sql";
import makeBackendSiteDesignerPageSectionNormalBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionNormalBuiltIn.sql";

type input = {
  id: string;
  name?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  userAnswersJsonB?: string;
  isReady?: boolean;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalSql(d);

    let webAssetImport: string;
    let menuJsonB: any;

    if (args.selectionType) {
      switch (args.selectionType) {
        case SelectionTypeEnum.BUILT_IN:
          const builtInMain = makeBackendSiteDesignerPageSectionNormalBuiltInSql(d)

          // update with getOne function in future. 
          const builtIn = await builtInMain.getOneById({
            id: args.selectionId
          })

          webAssetImport = builtIn.data.dataValues.webAssetImport
          menuJsonB = builtIn.data.dataValues.menuJsonB
          break;

        default:
          return {
            success: false,
            humanMessage: "Error with selecting component. 'BUILT_IN', 'PLUGIN', 'AGENCY', 'MARKET' ",
            errorIdentifier: "backendSiteDesignerPageSectionNormal_updateOne:0001",
          }
      }
    }

    const response = sql.updateOne({
      id: args.id,
      name: args.name,
      webAssetImport: webAssetImport,
      menuJsonB: menuJsonB,
      userAnswersJsonB: args.userAnswersJsonB,
      isReady: args.isReady,
      selectionType: args.selectionType,
      selectionId: args.selectionId,
      orderNumber: args.orderNumber,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}