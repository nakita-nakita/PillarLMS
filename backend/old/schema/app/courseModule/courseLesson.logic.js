/**
 * The functions responsible for handling the courseLessons type.
 * @module courseLessons_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  // const findOne = (sequelizeSearch) => {
  //   return new Promise(async (resolve, reject) => {
  //     const courseLessons = await db.courseLesson.findOne(sequelizeSearch);

  //     resolve(courseLessons);
  //   })
  // }

  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseLessons = await db.courseLesson.findOne({ where: { id, isDeleted: false } });

      resolve(courseLessons.dataValues);
    })
  }

  // const getOneByCourseId = ({ courseId }) => {
  //   return new Promise(async (resolve, reject) => {
  //     const courseLessons = await db.courseLesson.findOne({ where: { courseId, isDeleted: false } });

  //     resolve(courseLessons);
  //   })
  // }


  const findMany = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseLessons = await db.courseLesson.findAll(
        {
          ...sequelizeSearch,
          raw: true,
        }
      );

      resolve(courseLessons);
    })
  }

  const getMany = ({ courseModuleId }) => {
    return new Promise(async (resolve, reject) => {

      let search = {
        // [sequelize.fn('COALESCE', sequelize.fn('SUM', (mysql.col('col_name'), mysql.col('col_2_name'))), (some other code here ...)),'alias']
        where: {
          courseModuleId,
          isDeleted: false,
        },
        order: db.sequelize.literal('"orderNumber" ASC'),
        // include: [
        //   {

        //     model: db.courseLesson,
        //     where: { isDeleted: false },
        //     // order: db.sequelize.literal('"courseLessons"."orderNumber" DESC'),
        //     required: false,
        //     raw: true,
        //   }
        // ],
        // raw: true,
      };

      const courseLessons = await db.courseLesson.findAll(search);

      resolve(courseLessons)
    })
  }


  const addOneToEnd = (args) => {
    return new Promise(async (resolve, reject) => {

      const lessonCount = await db.courseLesson.count({
        where: {
          courseId: args.courseId,
          isDeleted: false,
        }
      })

      const lessonModule = await db.courseLesson.create({
        ...args,
        orderNumber: lessonCount + 1
      });

      resolve(lessonModule);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseLessons = {};

      let where = { id, isDeleted: false }

      savedcourseLessons = await db.courseLesson.update(
        args,
        {
          where,
          returning: true,
          raw: true,
        }
      );

      courseLessons = savedcourseLessons[0] !== 0 ? savedcourseLessons[1][0] : null


      resolve(courseLessons)
    })
  }

  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseLessons = await db.courseLesson.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseLessons[0] !== 0 ? courseLessons[1][0] : null)
    })
  }

  const upsertMany = (courseLessonArray) => {
    return new Promise(async (resolve) => {
      const recordsToCreate = [...courseLessonArray.filter(ra => !ra.id)]
      const recordsToUpdate = [...courseLessonArray.filter(ra => ra.id)]
      const recordsToDelete = [...courseLessonArray.filter(ra => ra.isDeleted)]

      if (recordsToCreate.length > 0) {
        await db.courseLesson.bulkCreate(recordsToCreate);
      }

      if (recordsToUpdate.length > 0) {
        for (let index = 0; index < recordsToUpdate.length; index++) {
          await updateOne(recordsToUpdate[index]) 
        }
      }

      if (recordsToDelete.length > 0) {

        for (let index = 0; index < recordsToDelete.length; index++) {
          await deleteOne(recordsToDelete[index]) 
        }
        // recordsToDelete.map(async rd => {
        //   await deleteOne({
        //     id: rd.id
        //   })
        // })
      }

      resolve();
    })
  }


  return {
    findMany,
    getOneById,
    getMany,
    addOneToEnd,
    updateOne,
    deleteOne,
    upsertMany,

    // putUserReadAccess
    // putUserUpdateAccess
    // putUserSettingsAccess
  }
}