/**
 * The functions responsible for handling the courseSettingsUpdateAccess type.
 * @module courseSettingsUpdateAccess_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;
  const { sequelize } = db;

  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findOne(sequelizeSearch);

      resolve(courseSettingsUpdateAccess);
    })
  }

  const findMany = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findAll(
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

      resolve(courseSettingsUpdateAccess);
    })
  }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.findOne({ where: { id, isDeleted: false } });

      resolve(courseSettingsUpdateAccess);
    })
  }

  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.create(args);

      resolve(courseSettingsUpdateAccess);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseSettingsUpdateAccess = {};

      let where = { id, isDeleted: false }

      savedcourseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.update(
        {
          args
        },
        {
          where,
          returning: true,
        }
      );

      courseSettingsUpdateAccess = savedcourseSettingsUpdateAccess[0] !== 0 ? savedcourseSettingsUpdateAccess[1][0].dataValues : null


      resolve(courseSettingsUpdateAccess)
    })
  }

  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsUpdateAccess = await db.courseSettingsUpdateAccess.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(courseSettingsUpdateAccess[0] !== 0 ? courseSettingsUpdateAccess[1][0].dataValues : null)
    })
  }

  const upsertMany = (coureSettingsUpdateAccessArray) => { // [{userId, courseId, isDeleted}]
    return new Promise(async (resolve) => {
      const recordsToCreate = [...coureSettingsUpdateAccessArray.filter(ra => !ra.isDeleted)]
      const recordsToDelete = [...coureSettingsUpdateAccessArray.filter(ra => ra.isDeleted)]

      if (recordsToCreate.length > 0) {
        await db.courseSettingsUpdateAccess.bulkCreate(recordsToCreate);
      }

      if (recordsToDelete.length > 0) {
        recordsToDelete.map(async rd => {
          await db.courseSettingsUpdateAccess.update(
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

  return {
    findOne,
    findMany,
    getOneById,
    addOne,
    updateOne,
    deleteOne,
    upsertMany,
  }
}


