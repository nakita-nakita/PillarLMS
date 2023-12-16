import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingHeaderSql from "../../../preMain/backendSettingHeader.sql";
import makeBackendSettingHeaderBuiltInMain from "../../backendSettingHeaderBuiltIn.main";
import backendSettingHeader, { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";


type input = {
  id?: string
  userAnswers: string
  isReady?: boolean,
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingHeader> | null>> => {

    const sql = makeBackendSettingHeaderSql(d);

    let webAssetImport: string;
    let menuJsonB: any;

    switch (args.selectionType) {
      case SelectionTypeEnum.BUILT_IN:
        const builtInMain = makeBackendSettingHeaderBuiltInMain(d)

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