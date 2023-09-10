

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  const findMany = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const courseModules = await db.courseModule.findAll(
        {
          ...sequelizeSearch,
          raw: true,          
        }
      );

      resolve(courseModules);
    })
  }

  const getMany = ({ courseId }) => {
    return new Promise(async (resolve, reject) => {

      let search = {
        // [sequelize.fn('COALESCE', sequelize.fn('SUM', (mysql.col('col_name'), mysql.col('col_2_name'))), (some other code here ...)),'alias']
        where: {
          courseId,
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
        raw: true,
      };

      const courseModules = await db.courseModule.findAll(search);

      resolve(courseModules)
    })
  }

  const addOneToEnd = (args) => {
    return new Promise(async (resolve, reject) => {

      const moduleCount = await db.courseModule.count({
        where: {
          courseId: args.courseId,
          isDeleted: false,
        }
      })

      const courseModule = await db.courseModule.create({
        ...args,
        orderNumber: moduleCount + 1
      });

      resolve(courseModule.dataValues);
    })
  }

  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {

      let courseModule = {};

      let where = { id, isDeleted: false }

      savedcourseModule = await db.courseModule.update(
        args,
        {
          where,
          returning: true,
          raw: true,
        }
      );

      courseModule = savedcourseModule[0] !== 0 ? savedcourseModule[1][0] : null

      resolve(courseModule)
    })
  }

  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseModule = await db.courseModule.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseModule[0] !== 0 ? courseModule[1][0] : null)
    })
  }

  const upsertMany = (courseModuleArray) => {
    return new Promise(async (resolve) => {
      let returningArray = [];
      const recordsToCreate = [...courseModuleArray.filter(r => !r.id)]
      const recordsToUpdate = [...courseModuleArray.filter(r => r.id && !r.isDeleted)]
      const recordsToDelete = [...courseModuleArray.filter(r => r.isDeleted)]


      if (recordsToCreate.length > 0) {
        const newData = await db.courseModule.bulkCreate(recordsToCreate, {raw: true})
        returningArray = [...newData.map(d => d.dataValues)]
      }

      if (recordsToUpdate.length > 0) {
        for (let i = 0; i < recordsToUpdate.length; i++) {
          const record = recordsToUpdate[i];

          const newData = await updateOne(record)
          returningArray.push(newData) 
        }
      }

      if (recordsToDelete.length > 0) {
        recordsToDelete.map(async rd => {
          await deleteOne({
            id: rd.id
          })
        })
      }

      resolve(returningArray);
    })
  }


  //sude - get list from db

  //sudo - compare two list of userId and remove the matching.

  //sudo - Database list is what to delete, param list is what to add.


  return {
    findMany,
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