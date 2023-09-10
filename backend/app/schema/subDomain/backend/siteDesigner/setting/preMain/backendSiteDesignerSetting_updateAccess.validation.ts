import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/updateAccessValidation/areIdsValid.script"
import isIdValid from "./scripts/updateAccessValidation/isIdValid.script"

export default function makeBackendSiteDesignerSettingUpdateAccessValidation(dbSub: d_sub) {

  return {
    areIdsValid: areIdsValid(dbSub),
    isIdValid: isIdValid(dbSub),
  }
}

// /**
//  * The functions responsible for handling the courseSettingsUpdateAccess type.
//  * @module courseSettingsUpdateAccess_logic
//  */

// const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;
//   const { sequelize } = db;

//   const findOne = (sequelizeSearch) => {
//     return new Promise(async (resolve) => {
//       const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findOne(sequelizeSearch).catch(errorHandler)

//       resolve({
//         success: true,
//         data: courseSettingsUpdateAccess
//       });
//     })
//   }

//   const findMany = (sequelizeSearch) => {
//     return new Promise(async (resolve) => {
//       const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findAll(
//         {
//           ...sequelizeSearch,
//           raw: true,
//           include: [
//             {
//               model: db.user,
//               required: true,
//               raw: true,
//             }
//           ]
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: courseSettingsUpdateAccess
//       });
//     })
//   }

//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findOne({
//         where: {
//           id,
//         },
//         raw: true,
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: courseSettingsUpdateAccess
//       });
//     })
//   }

//   const addOne = (args) => {
//     return new Promise(async (resolve) => {

//       const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.create(args).catch(errorHandler)

//       resolve({
//         success: true,
//         data: courseSettingsUpdateAccess
//       });
//     })
//   }

//   const updateOne = ({ id, ...args }) => {
//     return new Promise(async (resolve) => {

//       const savedcourseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.update(
//         args,
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
//         data: savedcourseSettingsUpdateAccess[0] !== 0 ? savedcourseSettingsUpdateAccess[1][0] : null
//       })
//     })
//   }

//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.update(
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
//         data: courseSettingsUpdateAccess[0] !== 0 ? courseSettingsUpdateAccess[1][0] : null
//       })
//     })
//   }

//   const upsertMany = (coureSettingsUpdateAccessArray) => { // [{userId, courseId, isDeleted}]
//     return new Promise(async (resolve) => {
//       // const recordsToCreate = [...coureSettingsUpdateAccessArray.filter(ra => !ra.isDeleted)]
//       // const recordsToDelete = [...coureSettingsUpdateAccessArray.filter(ra => ra.isDeleted)]

//       // if (recordsToCreate.length > 0) {
//       //   await db.courseSettingsUpdateAccess.bulkCreate(recordsToCreate);
//       // }

//       // if (recordsToDelete.length > 0) {
//       //   recordsToDelete.map(async rd => {
//       //     await db.courseSettingsUpdateAccess.update(
//       //       { isDeleted: true },
//       //       {
//       //         where: { courseId: rd.courseId, userId: rd.userId },
//       //       }
//       //     );
//       //   })
//       // }

//       resolve();
//     })
//   }

//   return {
//     findOne,
//     findMany,
//     getOneById,
//     addOne,
//     updateOne,
//     deleteOne,
//     upsertMany,
//   }
// }


