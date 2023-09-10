
const db = require("../../../models")
const makeCourseModuleLogic = require('./courseModule.logic');
const makeCourseLessonsLogic = require("./courseLesson.logic")

const courseModuleLogic = makeCourseModuleLogic(db)
const courseLessonLogic = makeCourseLessonsLogic(db)

const courseModuleGetMany = ({ courseId }) => {
  return new Promise(async (resolve) => {
    // const users = await userLogic.getManyWithPagination({});
    const data = await courseModuleLogic.getMany({ courseId })

    resolve({
      success: true,
      data
    })
  });
}

const courseModuleAddToEnd = ({ courseId, name }) => {
  return new Promise(async (resolve) => {
    const moduleData = await courseModuleLogic.addOneToEnd({
      courseId,
      name,
    })

    resolve({
      success: true,
      data: moduleData
    })
  });
}

const courseModuleUpdateOne = ({ id, name, orderNumber }) => {
  return new Promise(async (resolve) => {
    const moduleData = await courseModuleLogic.updateOne({
      id,
      name,
      orderNumber
    })

    resolve({
      success: true,
      data: moduleData
    })
  });
}

const courseModuleDelete = ({ id }) => {
  return new Promise(async (resolve) => {
    const moduleData = await courseModuleLogic.deleteOne({ id })
    // const users = await userLogic.getManyWithPagination({});

    resolve({
      success: true,
      data: moduleData
    })
  });
}

const courseModuleSet = ({ courseId, modules }) => {
  return new Promise(async (resolve) => {

    let modulesData;
    const courseModulesReturn = await courseModuleLogic.findMany({ where: { courseId, isDeleted: false } });


    // filter the db return with modules to know what to delete.
    const courseModuleDeletions = courseModulesReturn.filter((cl) => {
      for (let i = 0; i < modules.length; i++) {
        const element = modules[i];

        // filter if current record id is in new modules id. 
        if (element.id == cl.id) {
          return false
        }

      }
      return true;
    }).map(cl => ({
      id: cl.id,
      isDeleted: true
    }));

    const courseModuleUpdates = modules.filter((l) => {
      for (let i = 0; i < courseModulesReturn.length; i++) {
        const element = courseModulesReturn[i];

        // Keep if current record id is in new modules id. 
        if (element.id == l.id) {
          return true
        }

      }
      return false;
    }).map(l => ({
      id: l.id,
      name: l.name,
      orderNumber: l.orderNumber
    }));

    const courseModuleAdditions = modules.filter((l) => {
      if (l.id) {
        return false;
      }
      return true;
    }).map(l => ({
      courseId,
      name: l.name,
      orderNumber: l.orderNumber
    }));


    const bulkSavedArray = [...courseModuleDeletions, ...courseModuleUpdates, ...courseModuleAdditions];


    if (bulkSavedArray.length > 0) {
      modulesData = await courseModuleLogic.upsertMany(bulkSavedArray)
    }

    // modulesData.map(async m => {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const moduleData = modulesData[i];

      await courseLessonSet({
        courseModuleId: moduleData.id,
        lessons: module.lessons
      })
    }



    resolve({
      success: true
    })

  });
}


const courseLessonGetMany = ({ courseModuleId }) => {
  return new Promise(async (resolve) => {
    // const users = await userLogic.getManyWithPagination({});
    const data = await courseLessonLogic.getMany({ courseModuleId })

    resolve({
      success: true,
      data
    })
  });
}

const courseLessonAddToEnd = ({ courseModuleId, courseId, name, type }) => {
  return new Promise(async (resolve) => {
    const lessonData = await courseLessonLogic.addOneToEnd({
      courseModuleId,
      courseId,
      name,
      type,
    })
    // const users = await userLogic.getManyWithPagination({});

    resolve({
      success: true,
      data: lessonData
    })
  });
}

const courseLessonUpdateOne = ({ id, name, isReady, orderNumber, }) => {
  return new Promise(async (resolve) => {
    const lessonData = await courseLessonLogic.updateOne({
      id,
      name,
      isReady,
      orderNumber,
    })

    resolve({
      success: true,
      data: lessonData
    })
  });
}

const courseLessonDelete = ({ id }) => {
  return new Promise(async (resolve) => {
    const lessonData = await courseLessonLogic.deleteOne({
      id,
    })

    resolve({
      success: true,
      data: lessonData
    })
  });
}

const courseLessonSet = ({ courseModuleId, lessons }) => {
  return new Promise(async (resolve) => {
    // const users = await userLogic.getManyWithPagination({});
    if (lessons.length === 0 || !courseModuleId) {
      return resolve()
    }

    const courseLessonsReturn = await courseLessonLogic.findMany({
      where: {
        courseModuleId,
        isDeleted: false
      }
    });


    // filter the db return with lessons to know what to delete.
    const courseLessonDeletions = courseLessonsReturn.filter((cl) => {
      for (let i = 0; i < lessons.length; i++) {
        const element = lessons[i];

        // filter if current record id is in new lessons id. 
        if (element.id == cl.id) {
          return false
        }

      }
      return true;
    }).map(cl => ({
      id: cl.id,
      isDeleted: true
    }));

    const courseLessonUpdates = lessons.filter((l) => {
      for (let i = 0; i < courseLessonsReturn.length; i++) {
        const element = courseLessonsReturn[i];

        // Keep if current record id is in new lessons id. 
        if (element.id == l.id) {
          return true
        }

      }
      return false;
    }).map(l => ({
      id: l.id,
      name: l.name,
      isReady: l.isReady,
      orderNumber: l.orderNumber,
      courseModuleId,
    }));

    const updatesForMoved = lessons.filter((l) => {
      if (l.id) {
        let hasRecord = false;
        for (let i = 0; i < courseLessonsReturn.length; i++) {
          const element = courseLessonsReturn[i];

          // Keep if current record id is in new lessons id. 
          if (element.id == l.id) {
            hasRecord = true
          }

        }

        if (!hasRecord) {
          return true
        }

      }
      return false;
    }).map(l => ({
      id: l.id,
      name: l.name,
      isReady: l.isReady,
      orderNumber: l.orderNumber,
      courseModuleId,
    }));

    const courseLessonAdditions = lessons.filter((l) => {
      if (l.id) {
        return false;
      }
      return true;
    }).map(l => ({
      courseModuleId,
      courseId: l.courseId,
      name: l.name,
      orderNumber: l.orderNumber,
      type: l.type,
      courseModuleId,
    }));


    const bulkSavedArray = [...courseLessonDeletions, ...updatesForMoved, ...courseLessonUpdates, ...courseLessonAdditions];

    if (bulkSavedArray.length > 0) {
      await courseLessonLogic.upsertMany(bulkSavedArray)
    }

    resolve({
      success: true
    })
  });
}




module.exports = {
  courseModuleGetMany,
  courseModuleAddToEnd,
  courseModuleUpdateOne,
  courseModuleDelete,
  courseModuleSet,

  courseLessonGetMany,
  courseLessonAddToEnd,
  courseLessonUpdateOne,
  courseLessonDelete,
  courseLessonSet,
}