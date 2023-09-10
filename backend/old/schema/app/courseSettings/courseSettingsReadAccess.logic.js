/**
 * The functions responsible for handling the courseSettingsReadAccess type.
 * @module courseSettingsReadAccess_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;
  const { sequelize } = db;

  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsReadAccess = await db.courseSettingsReadAccess.findOne(sequelizeSearch);

      resolve(courseSettingsReadAccess);
    })
  }

  const findMany = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsReadAccess = await db.courseSettingsReadAccess.findAll(
        {
          ...sequelizeSearch,
          raw: true,
          include: [
            {
              model: db.user,
              required: true,
              raw: true,
            }
          ]
        }
      );

      resolve(courseSettingsReadAccess);
    })
  }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsReadAccess = await db.courseSettingsReadAccess.findOne({ where: { id, isDeleted: false } });

      resolve(courseSettingsReadAccess);
    })
  }

  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const courseSettingsReadAccess = await db.courseSettingsReadAccess.create(args);

      resolve(courseSettingsReadAccess);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseSettingsReadAccess = {};

      let where = { id, isDeleted: false }

      savedcourseSettingsReadAccess = await db.courseSettingsReadAccess.update(
        {
          args
        },
        {
          where,
          returning: true,
        }
      );

      courseSettingsReadAccess = savedcourseSettingsReadAccess[0] !== 0 ? savedcourseSettingsReadAccess[1][0].dataValues : null


      resolve(courseSettingsReadAccess)
    })
  }

  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsReadAccess = await db.courseSettingsReadAccess.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(courseSettingsReadAccess[0] !== 0 ? courseSettingsReadAccess[1][0].dataValues : null)
    })
  }

  const upsertMany = (coureSettingsReadAccessArray) => { // [{userId, courseId, isDeleted}]
    return new Promise(async (resolve) => {
      const recordsToCreate = [...coureSettingsReadAccessArray.filter(ra => !ra.isDeleted)]
      const recordsToDelete = [...coureSettingsReadAccessArray.filter(ra => ra.isDeleted)]

      if (recordsToCreate.length > 0) {
        await db.courseSettingsReadAccess.bulkCreate(recordsToCreate);
      }

      if (recordsToDelete.length > 0) {
        recordsToDelete.map(async rd => {
          await db.courseSettingsReadAccess.update(
            { isDeleted: true },
            {
              where: { courseId: rd.courseId, userId: rd.userId },
            }
          );
        })
      }

      resolve();
    })
  }

  //sudo - get list from db

  //sudo - compare two list of userId and remove the matching.

  //sudo - Database list is what to delete, param list is what to add.


  return {
    findOne,
    findMany,
    getOneById,
    addOne,
    updateOne,
    deleteOne,
    upsertMany,
    // putUserReadAccess
    // putUserUpdateAccess
    // putUserSettingsAccess
  }
}
// // INSERT INTO public.course_settings(
// // 	id, "canAllCreatorsRead", "canAllCreatorsUpdate", "isDeleted", "createdAt", "updatedAt", "ownerId", "userId", "courseId")
// // 	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
// sequelize.query(`SELECT * FROM users WHERE id = :id`, {
//   replacements: { id },
// });

// // INSERT INTO public.course_settings_read_accesses(
// // 	id, "isDeleted", "createdAt", "updatedAt", "userId", "courseId")
// // 	VALUES (?, ?, ?, ?, ?, ?);


