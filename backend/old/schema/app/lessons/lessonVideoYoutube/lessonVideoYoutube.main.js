
const db = require("../../../../models")
const makeLessonLogic = require("../../courseModule/courseLesson.logic")
const makeLessonVideoYoutubeLogic = require("./lessonVideoYoutube.logic")

const lessonLogic = makeLessonLogic(db)
const lessonVideoYoutubeLogic = makeLessonVideoYoutubeLogic(db)



const getLessonVideoYoutube = ({ lessonId }) => {
  return new Promise(async (resolve) => {
    const lessonVideoYoutube = await lessonVideoYoutubeLogic.getOneByLessonId({
      lessonId,
    })

    const lesson = await lessonLogic.getOneById({
      id: lessonId,
    })


    resolve({
      success: true,
      data: {
        ...lesson,
        ...lessonVideoYoutube,
        lessonId,
      }
    })
  })
}

const setLessonVideoYoutube = ({ lessonId, name, isReady, youtubeVideoId }) => {
  return new Promise(async (resolve, reject) => {
    const lesson = await lessonLogic.getOneById({
      id: lessonId,
    })

    if (!lesson) {
      reject({
        type: "userError",
        message: "This lessonId does not exist."
      })
    }

    const lessonVideoYoutubeCurrentRecord = await lessonVideoYoutubeLogic.getOneByLessonId({ lessonId })
    let returningData = {};

    if (!lessonVideoYoutubeCurrentRecord && youtubeVideoId) {
      returningData = {
        ...returningData,
        ...await lessonVideoYoutubeLogic.addOne({
          courseLessonId: lessonId,
          youtubeVideoId,
        })
      }
    } else {
      returningData = {
        ...returningData,
        ...await lessonVideoYoutubeLogic.updateOneByLessonId({
          lessonId,
          youtubeVideoId,
        })
      }
    }


    if (name || isReady !== undefined) {
      returningData = {
        ...await lessonLogic.updateOne({
          id: lessonId,
          name,
          isReady,
        }),
        ...returningData,
        lessonId,
      }
    }

    resolve({
      success: true,
      data: returningData,
    });
  })
}

module.exports = {
  getLessonVideoYoutube,
  setLessonVideoYoutube,
}