import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getAll from "./scripts/readAccessSql/getAll.script"
import setList from "./scripts/readAccessSql/setList.script"

export default function makeBackendSiteDesignerSettingReadAccessSql(dbSub: d_sub) {

  return {
    getAll: getAll(dbSub),
    setList: setList(dbSub),
  }
}

// // /**
// //  * The functions responsible for handling the courseSettingsReadAccess type.
// //  * @module courseSettingsReadAccess_logic
// //  */

// // const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// // module.exports = (db) => {
// //   const Op = db.Sequelize.Op;
// //   const { sequelize } = db;

// //   const findOne = (sequelizeSearch) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.findOne(sequelizeSearch).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsReadAccess
// //       });
// //     })
// //   }

// //   const findMany = (sequelizeSearch) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.findAll(
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
// //         data: courseSettingsReadAccess
// //       });
// //     })
// //   }

// //   const getOneById = ({ id }) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.findOne({
// //         where: {
// //           id,
// //         }
// //       }).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsReadAccess
// //       });
// //     })
// //   }

// //   const addOne = (args) => {
// //     return new Promise(async (resolve) => {

// //       const courseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.create(args).catch(errorHandler)

// //       resolve({
// //         success: true,
// //         data: courseSettingsReadAccess
// //       });
// //     })
// //   }

// //   const updateOne = ({ id, ...args }) => {
// //     return new Promise(async (resolve) => {

// //       const savedcourseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.update(
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
// //       );

// //       resolve({
// //         success: true,
// //         data: savedcourseSettingsReadAccess[0] !== 0 ? savedcourseSettingsReadAccess[1][0] : null,
// //       })
// //     })
// //   }

// //   const deleteOne = ({ id }) => {
// //     return new Promise(async (resolve) => {
// //       const courseSettingsReadAccess = await db.backendSiteDesignerSetting_readAccess.destory(
// //         {
// //           where: {
// //             id,
// //           },
// //           returning: true,
// //           raw: true,
// //         }
// //       );

// //       resolve({
// //         success: true,
// //         data: courseSettingsReadAccess[0] !== 0 ? courseSettingsReadAccess[1][0] : null
// //       })
// //     })
// //   }

// //   const upsertMany = (coureSettingsReadAccessArray) => { // [{userId, courseId, isDeleted}]
// //     return new Promise(async (resolve) => {
// //       // const recordsToCreate = [...coureSettingsReadAccessArray.filter(ra => !ra.isDeleted)]
// //       // const recordsToDelete = [...coureSettingsReadAccessArray.filter(ra => ra.isDeleted)]

// //       // if (recordsToCreate.length > 0) {
// //       //   await db.backendSiteDesignerSetting_readAccess.bulkCreate(recordsToCreate).catch(errorHandler)
// //       // }

// //       // if (recordsToDelete.length > 0) {
// //       //   recordsToDelete.map(async rd => {
// //       //     await db.backendSiteDesignerSetting_readAccess.update(
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

// //   //sudo - get list from db

// //   //sudo - compare two list of userId and remove the matching.

// //   //sudo - Database list is what to delete, param list is what to add.


// //   return {
// //     findOne,
// //     findMany,
// //     getOneById,
// //     addOne,
// //     updateOne,
// //     deleteOne,
// //     upsertMany,
// //     // putUserReadAccess
// //     // putUserUpdateAccess
// //     // putUserSettingsAccess
// //   }
// // }
// // // // INSERT INTO public.course_settings(
// // // // 	id, "canAllCreatorsRead", "canAllCreatorsUpdate", "isDeleted", "createdAt", "updatedAt", "ownerId", "userId", "courseId")
// // // // 	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
// // // sequelize.query(`SELECT * FROM users WHERE id = :id`, {
// // //   replacements: { id },
// // // });

// // // // INSERT INTO public.course_settings_read_accesses(
// // // // 	id, "isDeleted", "createdAt", "updatedAt", "userId", "courseId")
// // // // 	VALUES (?, ?, ?, ?, ?, ?);


