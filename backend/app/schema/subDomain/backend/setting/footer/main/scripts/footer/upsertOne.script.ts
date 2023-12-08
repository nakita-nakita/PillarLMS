import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooter from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooter.model";
import makeBackendSettingFooterSql from "../../../preMain/backendSettingFooter.sql";
import makeBackendSettingFooterBuiltInMain from "../../backendSettingFooterBuiltIn.main";

export enum selectionTypeEnum {
  BUILT_IN = "BUILT_IN",
  PLUGIN = "PLUGIN",
  MARKET = "MARKET",
}

type input = {
  id?: string
  userAnswers: string
  isReady?: boolean,
  selectionType?: selectionTypeEnum,
  selectionId?: string,
}

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooter> | null>> => {

    const sql = makeBackendSettingFooterSql(d);

    let webAssetImport: string;
    let menuJsonB: any;

    switch (args.selectionType) {
      case selectionTypeEnum.BUILT_IN:
        const builtInMain = makeBackendSettingFooterBuiltInMain(d)

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
          errorIdentifier: "backendSettingFooter_upsertOne:0001",
        }
    }

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.upsertOne({
      id: args.id,
      webAssetImport: webAssetImport,
      menuJsonB: menuJsonB,
      userAnswersJsonB: args.userAnswers,
      isReady: args.isReady,
      selectionType: args.selectionType,
      selectionId: args.selectionId,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}