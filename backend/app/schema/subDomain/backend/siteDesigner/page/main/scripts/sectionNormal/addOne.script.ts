import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageSectionNormalSql from "../../../preMain/backendSiteDesignerPageSectionNormal.sql";
import makeBackendSiteDesignerPageSectionNormalBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionNormalBuiltIn.sql";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

type input = {
  pageId: string;
  selectionType: SelectionTypeEnum;
  selectionId: string;
  orderNumber: number;
  name?: string;
  author?: string;
  userAnswersJsonB?: string;
  isReady?: boolean;
};

// selectionType: SelectionTypeEnum;

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalSql(d);

    let webAssetImport: string;
    let menuJsonB: any;
    let name: string;
    let author: string;

    switch (args.selectionType) {
      case SelectionTypeEnum.BUILT_IN:
        const builtInMain = makeBackendSiteDesignerPageSectionNormalBuiltInSql(d)

        // update with getOne function in future. 
        const builtIn = await builtInMain.getOneById({
          id: args.selectionId
        })

        webAssetImport = builtIn.data.dataValues.webAssetImport
        menuJsonB = builtIn.data.dataValues.menuJsonB

        if (args.name) {
          name = args.name
        } else {
          name = builtIn.data.dataValues.name
        }

        if (args.author) {
          author = args.author
        } else {
          author = builtIn.data.dataValues.author
        }
        break;

      default:
        return {
          success: false,
          humanMessage: "Error with selecting component. 'BUILT_IN', 'PLUGIN', 'AGENCY', 'MARKET' ",
          errorIdentifier: "backendSiteDesignerPageSectionNormal_addOne:0001",
        }
    }

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.addOne({
      pageId: args.pageId,
      name,
      author,
      orderNumber: args.orderNumber,
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