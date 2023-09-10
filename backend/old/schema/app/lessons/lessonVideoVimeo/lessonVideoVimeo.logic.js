// /**
//  * The functions responsible for handling the lessonVideoVimeo type.
//  * @module lessonVideoVimeo_logic
//  */

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;

//   const findOne = (sequelizeSearch) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonVideoVimeo = await db.lessonVideoVimeo.findOne(sequelizeSearch);

//       resolve(lessonVideoVimeo);
//     })
//   }

//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonVideoVimeo = await db.lessonVideoVimeo.findOne({ where: { id, isDeleted: false } });

//       resolve(lessonVideoVimeo);
//     })
//   }

//   const getOneByCourseId = ({ courseId }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonVideoVimeo = await db.lessonVideoVimeo.findOne({ where: { courseId, isDeleted: false } });

//       resolve(lessonVideoVimeo);
//     })
//   }

//   const addOne = (args) => {
//     return new Promise(async (resolve, reject) => {

//       const lessonVideoVimeo = await db.lessonVideoVimeo.create(args);

//       resolve(lessonVideoVimeo);
//     })
//   }

//   const updateOne = ({ id, ...args }) => {
//     return new Promise(async (resolve, reject) => {

//       let lessonVideoVimeo = {};

//       let where = { id, isDeleted: false }

//       savedlessonVideoVimeo = await db.lessonVideoVimeo.update(
//         args,
//         {
//           where,
//           returning: true,
//         }
//       );

//       lessonVideoVimeo = savedlessonVideoVimeo[0] !== 0 ? savedlessonVideoVimeo[1][0].dataValues : null


//       resolve(lessonVideoVimeo)
//     })
//   }

//   const updateOneByCourseId = ({ courseId, ...args }) => {
//     return new Promise(async (resolve, reject) => {

//       let lessonVideoVimeo = {};

//       let where = { courseId, isDeleted: false }

//       savedlessonVideoVimeo = await db.lessonVideoVimeo.update(
//         args,
//         {
//           where,
//           returning: true,
//         }
//       );

//       lessonVideoVimeo = savedlessonVideoVimeo[0] !== 0 ? savedlessonVideoVimeo[1][0].dataValues : null


//       resolve(lessonVideoVimeo)
//     })
//   }
//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const lessonVideoVimeo = await db.lessonVideoVimeo.update(
//         { isDeleted: true },
//         {
//           where: { id, isDeleted: false },
//           returning: true,
//         }
//       );

//       resolve(lessonVideoVimeo[0] !== 0 ? lessonVideoVimeo[1][0].dataValues : null)
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