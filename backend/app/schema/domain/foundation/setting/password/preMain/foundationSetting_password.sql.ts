import { d_domain } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeFoundationSettingPasswordSql(d: d_domain) {

  return {
    getOne: getOne(d),
    updateOne: updateOne(d),
  }
}
// const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// /**
//  * The functions responsible for handling the settingPassword type.
//  * @module settingPassword_logic
//  */


// module.exports = (db) => {
//   /**
//    * Retrieves the password settings. 
//    * @returns {settingPassword}
//    * @example 
//    *  await settingPasswordLogic.getOne()
//    * 
//    */
//   const getOne = () => {
//     return new Promise(async (resolve) => {

//       const settingPassword = await db.backendSetting_password.findOne().catch(errorHandler);

//       resolve({
//         success: true,
//         data: settingPassword
//       })
//     })
//   }

//   /**
//    * Updates the password settings
//    * @param {Object} settingPasswordObject - { passwordLength, shouldHaveUppercaseLetter, shouldHaveLowercaseLetter, shouldHaveNumber, shouldHaveSymbol }
//    * @returns {settingPassword}
//    * @example 
//    *  await settingPasswordLogic.updateOne({
//    *      passwordLength, 
//    *      shouldHaveUppercaseLetter, 
//    *      shouldHaveLowercaseLetter, 
//    *      shouldHaveNumber, 
//    *      shouldHaveSymbol }
//    *  })
//    * 
//    */

//   const updateOne = (obj) => {
//     return new Promise(async (resolve) => {

//       const settingPassword = await db.backendSetting_password.findOne().catch(errorHandler)

//       const settingPasswordUpdated = await backendSetting_password.update(obj,
//         {
//           where: {
//             id: settingPassword.id
//           },
//           returning: true,
//           raw: true,
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: settingPasswordUpdated[0] !== 0 ? settingPasswordUpdated[1][0] : null
//       })
//     })
//   }

//   return {
//     getOne,
//     updateOne,
//   }
// }