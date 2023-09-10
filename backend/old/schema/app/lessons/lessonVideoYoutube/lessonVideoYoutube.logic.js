/**
 * The functions responsible for handling the lessonVideoYoutube type.
 * @module lessonVideoYoutube_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const lessonVideoYoutube = await db.lessonVideoYoutube.findOne(sequelizeSearch);

      resolve(lessonVideoYoutube);
    })
  }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const lessonVideoYoutube = await db.lessonVideoYoutube.findOne({
        where: {
          id,
          isDeleted: false
        },
        raw: true,
      });

      resolve(lessonVideoYoutube);
    })
  }

  const getOneByLessonId = ({ lessonId }) => {
    return new Promise(async (resolve, reject) => {
      const lessonVideoYoutube = await db.lessonVideoYoutube.findOne({
        where: {
          courseLessonId: lessonId,
          isDeleted: false,
        },
        raw: true,
      });

      resolve(lessonVideoYoutube);
    })
  }

  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const lessonVideoYoutube = await db.lessonVideoYoutube.create(args);

      resolve(lessonVideoYoutube.dataValues);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let lessonVideoYoutube = {};

      let where = { id, isDeleted: false }

      savedlessonVideoYoutube = await db.lessonVideoYoutube.update(
        args,
        {
          where,
          returning: true,
          raw: true,
        }
      );

      lessonVideoYoutube = savedlessonVideoYoutube[0] !== 0 ? savedlessonVideoYoutube[1][0] : null


      resolve(lessonVideoYoutube)
    })
  }

  const updateOneByLessonId = ({ lessonId, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let lessonVideoYoutube = {};

      let where = { courseLessonId: lessonId, isDeleted: false }

      savedlessonVideoYoutube = await db.lessonVideoYoutube.update(
        args,
        {
          where,
          returning: true,
          raw: true,
        }
      );

      lessonVideoYoutube = savedlessonVideoYoutube[0] !== 0 ? savedlessonVideoYoutube[1][0] : null


      resolve(lessonVideoYoutube)
    })
  }
  const deleteOneByLessonId = ({ lessonId }) => {
    return new Promise(async (resolve, reject) => {
      const lessonVideoYoutube = await db.lessonVideoYoutube.update(
        { isDeleted: true },
        {
          where: { 
            courseLessonId: lessonId, 
            isDeleted: false,
          },
          returning: true,
          raw: true,
        }
      );

      resolve(lessonVideoYoutube[0] !== 0 ? lessonVideoYoutube[1][0] : null)
    })
  }

  //sude - get list from db

  //sudo - compare two list of userId and remove the matching.

  //sudo - Database list is what to delete, param list is what to add.


  return {
    findOne,
    getOneById,
    getOneByLessonId,
    addOne,
    updateOne,
    updateOneByLessonId,
    deleteOneByLessonId,

    // putUserReadAccess
    // putUserUpdateAccess
    // putUserSettingsAccess
  }
}