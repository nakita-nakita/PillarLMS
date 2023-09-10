// /**
//  * The functions responsible for handling the lessonSimplePost type.
//  * @module lessonSimplePost_logic
//  */

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;

//   const findOne = (sequelizeSearch) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonSimplePost = await db.lessonSimplePost.findOne(sequelizeSearch);

//       resolve(lessonSimplePost);
//     })
//   }

//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonSimplePost = await db.lessonSimplePost.findOne({ where: { id, isDeleted: false } });

//       resolve(lessonSimplePost);
//     })
//   }

//   const getOneByCourseId = ({ courseId }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonSimplePost = await db.lessonSimplePost.findOne({ where: { courseId, isDeleted: false } });

//       resolve(lessonSimplePost);
//     })
//   }

//   const addOne = (args) => {
//     return new Promise(async (resolve, reject) => {

//       const lessonSimplePost = await db.lessonSimplePost.create(args);

//       resolve(lessonSimplePost);
//     })
//   }

//   const updateOne = ({ id, ...args }) => {
//     return new Promise(async (resolve, reject) => {

//       let lessonSimplePost = {};

//       let where = { id, isDeleted: false }

//       savedlessonSimplePost = await db.lessonSimplePost.update(
//         args,
//         {
//           where,
//           returning: true,
//         }
//       );

//       lessonSimplePost = savedlessonSimplePost[0] !== 0 ? savedlessonSimplePost[1][0].dataValues : null


//       resolve(lessonSimplePost)
//     })
//   }

//   const updateOneByCourseId = ({ courseId, ...args }) => {
//     return new Promise(async (resolve, reject) => {

//       let lessonSimplePost = {};

//       let where = { courseId, isDeleted: false }

//       savedlessonSimplePost = await db.lessonSimplePost.update(
//         args,
//         {
//           where,
//           returning: true,
//         }
//       );

//       lessonSimplePost = savedlessonSimplePost[0] !== 0 ? savedlessonSimplePost[1][0].dataValues : null


//       resolve(lessonSimplePost)
//     })
//   }
//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonSimplePost = await db.lessonSimplePost.update(
//         { isDeleted: true },
//         {
//           where: { id, isDeleted: false },
//           returning: true,
//         }
//       );

//       resolve(lessonSimplePost[0] !== 0 ? lessonSimplePost[1][0].dataValues : null)
//     })
//   }

//   //sude - get list from db

//   //sudo - compare two list of userId and remove the matching.

//   //sudo - Database list is what to delete, param list is what to add.


//   return {
//     findOne,
//     getOneById,
//     getOneByCourseId,
//     updateOneByCourseId,
//     addOne,
//     updateOne,
//     deleteOne,

//     // putUserReadAccess
//     // putUserUpdateAccess
//     // putUserSettingsAccess
//   }
// }