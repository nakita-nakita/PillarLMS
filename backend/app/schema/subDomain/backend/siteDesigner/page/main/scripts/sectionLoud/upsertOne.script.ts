import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoud from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";
import makeBackendSiteDesignerPageSectionLoudSql from "../../../preMain/backendSiteDesignerPageSectionLoud.sql";
import makeBackendSiteDesignerPageSectionLoudBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionLoudBuiltIn.sql";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";


type Input = {
  pageId: string;
  id?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  userAnswersJsonB?: string;
  isReady?: boolean;
};

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionLoudSql(d);

    let webAssetImport: string;
    let menuJsonB: any;

    if (args.selectionType) {
      switch (args.selectionType) {
        case SelectionTypeEnum.BUILT_IN:
          const builtInMain = makeBackendSiteDesignerPageSectionLoudBuiltInSql(d)

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
            errorIdentifier: "backendSettingHeader_upsertOne:0001",
          }
      }
    }

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.upsertOne({
      id: args.id,
      pageId: args.pageId,
      webAssetImport: webAssetImport,
      menuJsonB: menuJsonB,
      userAnswersJsonB: args.userAnswersJsonB,
      isReady: args.isReady,
      selectionType: args.selectionType,
      selectionId: args.selectionId,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}