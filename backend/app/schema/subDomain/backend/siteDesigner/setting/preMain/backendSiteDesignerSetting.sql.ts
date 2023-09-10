import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendSiteDesignerSettingSql(dbSub: d_sub) {

  return {
    getOne: getOne(dbSub),
    updateOne: updateOne(dbSub),
  }
}

// /**
//  * The functions responsible for handling the siteDesignerSettings type.
//  * @module siteDesignerSettings_logic
//  */

// const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;

//   const findOne = (sequelizeSearch) => {
//     return new Promise(async (resolve) => {
//       const siteDesignerSettings = await db.backendSiteDesignerSetting.findOne(sequelizeSearch).catch(errorHandler)

//       resolve({
//         success: true,
//         data: siteDesignerSettings
//       });
//     })
//   }

//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const siteDesignerSettings = await db.backendSiteDesignerSetting.findOne({
//         where: {
//           id,
//         }
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: siteDesignerSettings
//       });
//     })
//   }

//   const addOne = (args) => {
//     return new Promise(async (resolve) => {

//       const siteDesignerSettings = await db.backendSiteDesignerSetting.create(args).catch(errorHandler)

//       resolve({
//         success: true,
//         data: siteDesignerSettings.dataValues
//       });
//     })
//   }

//   const updateOne = ({ id, ...args }) => {
//     return new Promise(async (resolve) => {

//       const savedsiteDesignerSettings = await db.siteDesignerSettings.update(
//         args,
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       ).catch(errorHandler)

//       // siteDesignerSettings = savedsiteDesignerSettings[0] !== 0 ? savedsiteDesignerSettings[1][0] : null
//       resolve({
//         success: true,
//         data: savedsiteDesignerSettings[0] !== 0 ? savedsiteDesignerSettings[1][0] : null
//       })
//     })
//   }

//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const siteDesignerSettings = await db.siteDesignerSettings.destory(
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: siteDesignerSettings[0] !== 0 ? siteDesignerSettings[1][0] : null
//       })
//     })
//   }

//   //sude - get list from db

//   //sudo - compare two list of userId and remove the matching.

//   //sudo - Database list is what to delete, param list is what to add.


//   return {
//     findOne,
//     getOneById,
//     addOne,
//     updateOne,
//     deleteOne,
//   }
// }