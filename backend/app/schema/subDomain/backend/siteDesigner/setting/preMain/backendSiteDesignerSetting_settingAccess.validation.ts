import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/settingAccessValidation/areIdsValid.script"
import isIdValid from "./scripts/settingAccessValidation/isIdValid.script"

export default function makeBackendSiteDesignerSettingSettingAccessValidation(dbSub: d_sub) {

  return {
    areIdsValid: areIdsValid(dbSub),
    isIdValid: isIdValid(dbSub),
  }
}

// // /**
// //  * The functions responsible for handling the courseSettingsSettingAccess type.
// //  * @module courseSettingsSettingAccess_logic
// //  */

// // const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// // module.exports = (db) => {
// //   const Op = db.Sequelize.Op;
// //   const { sequelize } = db;

// //   const findOne = (sequelizeSearch) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findOne(sequelizeSearch).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsSettingAccess?.dataValues ? courseSettingsSettingAccess.dataValues : courseSettingsSettingAccess
// //       });
// //     })
// //   }

// //   const findMany = (sequelizeSearch) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findAll(
// //         {
// //           ...sequelizeSearch,
// //           raw: true,
// //           include: [
// //             {
// //               model: db.user,
// //               required: true,
// //               raw: true,
// //             }
// //           ]
// //         }
// //       ).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsSettingAccess
// //       });
// //     })
// //   }

// //   const getOneById = ({ id }) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findOne({
// //         where: {
// //           id,
// //         },
// //         raw: true,
// //       }).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsSettingAccess
// //       });
// //     })
// //   }

// //   const addOne = (args) => {
// //     return new Promise(async (resolve) => {

// //       const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.create(args).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsSettingAccess
// //       });
// //     })
// //   }

// //   const updateOne = ({ id, ...args }) => {
// //     return new Promise(async (resolve) => {

// //       const savedcourseSettingsSettingAccess = await db.courseSettingsSettingAccess.update(
// //         {
// //           args
// //         },
// //         {
// //           where: {
// //             id,
// //           },
// //           returning: true,
// //           raw: true,
// //         }
// //       ).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: savedcourseSettingsSettingAccess[0] !== 0 ? savedcourseSettingsSettingAccess[1][0] : null
// //       })
// //     })
// //   }

// //   const deleteOne = ({ id }) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.update(
// //         { isDeleted: true },
// //         {
// //           where: { 
// //             id, 
// //            },
// //           returning: true,
// //           raw: true,
// //         }
// //       );

// //       resolve({
// //         success: true,
// //         data: courseSettingsSettingAccess[0] !== 0 ? courseSettingsSettingAccess[1][0] : null
// //       })
// //     })
// //   }

// //   const upsertMany = (coureSettingsSettingAccessArray) => { // [{userId, courseId, isDeleted}]
// //     return new Promise(async (resolve) => {
// //       // const recordsToCreate = [...coureSettingsSettingAccessArray.filter(ra => !ra.isDeleted)]
// //       // const recordsToDelete = [...coureSettingsSettingAccessArray.filter(ra => ra.isDeleted)]

// //       // if (recordsToCreate.length > 0) {
// //       //   await db.courseSettingsSettingAccess.bulkCreate(recordsToCreate);
// //       // }

// //       // if (recordsToDelete.length > 0) {
// //       //   recordsToDelete.map(async rd => {
// //       //     await db.courseSettingsSettingAccess.update(
// //       //       { isDeleted: true },
// //       //       {
// //       //         where: { courseId: rd.courseId, userId: rd.userId },
// //       //       }
// //       //     );
// //       //   })
// //       // }

// //       resolve();
// //     })
// //   }

// //   return {
// //     findOne,
// //     findMany,
// //     getOneById,
// //     addOne,
// //     updateOne,
// //     deleteOne,
// //     upsertMany,
// //   }
// // }


