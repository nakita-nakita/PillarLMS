/**
 * The functions responsible for handling the courseSettings type.
 * @module courseSettings_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettings = await db.courseSettings.findOne(sequelizeSearch);

      resolve(courseSettings);
    })
  }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettings = await db.courseSettings.findOne({ where: { id, isDeleted: false } });

      resolve(courseSettings);
    })
  }

  const getOneByCourseId = ({ courseId }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettings = await db.courseSettings.findOne({ where: { courseId, isDeleted: false } });

      resolve(courseSettings);
    })
  }

  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const courseSettings = await db.courseSettings.create(args);

      resolve(courseSettings);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseSettings = {};

      let where = { id, isDeleted: false }

      savedcourseSettings = await db.courseSettings.update(
        args,
        {
          where,
          returning: true,
        }
      );

      courseSettings = savedcourseSettings[0] !== 0 ? savedcourseSettings[1][0].dataValues : null


      resolve(courseSettings)
    })
  }

  const updateOneByCourseId = ({ courseId, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseSettings = {};

      let where = { courseId, isDeleted: false }

      savedcourseSettings = await db.courseSettings.update(
        args,
        {
          where,
          returning: true,
        }
      );

      courseSettings = savedcourseSettings[0] !== 0 ? savedcourseSettings[1][0].dataValues : null


      resolve(courseSettings)
    })
  }
  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettings = await db.courseSettings.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(courseSettings[0] !== 0 ? courseSettings[1][0].dataValues : null)
    })
  }

  //sude - get list from db

  //sudo - compare two list of userId and remove the matching.

  //sudo - Database list is what to delete, param list is what to add.


  return {
    findOne,
    getOneById,
    getOneByCourseId,
    updateOneByCourseId,
    addOne,
    updateOne,
    deleteOne,

    // putUserReadAccess
    // putUserUpdateAccess
    // putUserSettingsAccess
  }
}