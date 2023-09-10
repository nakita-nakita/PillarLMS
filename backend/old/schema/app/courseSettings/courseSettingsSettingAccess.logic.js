/**
 * The functions responsible for handling the courseSettingsSettingAccess type.
 * @module courseSettingsSettingAccess_logic
 */

 module.exports = (db) => {
  const Op = db.Sequelize.Op;
  const { sequelize } = db;

  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findOne(sequelizeSearch);

      resolve(courseSettingsSettingAccess);
    })
  }

  const findMany = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findAll(
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

      resolve(courseSettingsSettingAccess);
    })
  }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.findOne({ where: { id, isDeleted: false } });

      resolve(courseSettingsSettingAccess);
    })
  }

  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.create(args);

      resolve(courseSettingsSettingAccess);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseSettingsSettingAccess = {};

      let where = { id, isDeleted: false }

      savedcourseSettingsSettingAccess = await db.courseSettingsSettingAccess.update(
        {
          args
        },
        {
          where,
          returning: true,
        }
      );

      courseSettingsSettingAccess = savedcourseSettingsSettingAccess[0] !== 0 ? savedcourseSettingsSettingAccess[1][0].dataValues : null


      resolve(courseSettingsSettingAccess)
    })
  }

  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseSettingsSettingAccess = await db.courseSettingsSettingAccess.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(courseSettingsSettingAccess[0] !== 0 ? courseSettingsSettingAccess[1][0].dataValues : null)
    })
  }

  const upsertMany = (coureSettingsSettingAccessArray) => { // [{userId, courseId, isDeleted}]
    return new Promise(async (resolve) => {
      const recordsToCreate = [...coureSettingsSettingAccessArray.filter(ra => !ra.isDeleted)]
      const recordsToDelete = [...coureSettingsSettingAccessArray.filter(ra => ra.isDeleted)]

      if (recordsToCreate.length > 0) {
        await db.courseSettingsSettingAccess.bulkCreate(recordsToCreate);
      }

      if (recordsToDelete.length > 0) {
        recordsToDelete.map(async rd => {
          await db.courseSettingsSettingAccess.update(
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


