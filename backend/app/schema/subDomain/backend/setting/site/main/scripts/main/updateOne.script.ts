import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_site from "../../../../../../../../models/subDomain/backend/setting/backendSetting_site.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSetting_site.sql";

type input = {
  churchShortName?: string
  favicon?: string
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_site> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const siteSql = makeBackendSettingSiteSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await siteSql.updateOne({
      churchShortName: args.churchShortName,
      favicon: args.favicon,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}

// // import { errorHandler } from "../../../../../../../utils/errorHandling/sequelize.errorHandler"
// import makeSettingPasswordLogic from "../../../preMain/backendSetting_password.sql"

// module.exports = (db) => {
//   const settingPasswordLogic = makeSettingPasswordLogic(db)

//   return ({
//     passwordLength,
//     shouldHaveUppercaseLetter,
//     shouldHaveLowercaseLetter,
//     shouldHaveNumber,
//     shouldHaveSymbol
//   }) => {
//     return new Promise(async (resolve) => {

//       const data = await settingPasswordLogic.updateOne({
//         passwordLength,
//         shouldHaveUppercaseLetter,
//         shouldHaveLowercaseLetter,
//         shouldHaveNumber,
//         shouldHaveSymbol,
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }
// }