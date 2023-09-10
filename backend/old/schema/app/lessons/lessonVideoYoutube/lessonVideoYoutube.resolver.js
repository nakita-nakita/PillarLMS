const { errorHandler } = require('../../../utils');
const lessonVideoYoutubeEntity = require('./lessonVideoYoutube.main');


const lessonVideoYoutubeResolver = {
  Query: {
    lessonVideoYoutube: async (parent, args, context) => {
      try {
        const lessonVideoYoutube = await lessonVideoYoutubeEntity.getLessonVideoYoutube({
          lessonId: args.lessonId
        })



        return lessonVideoYoutube.data;

      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
  },
  Mutation: {
    lessonVideoYoutubeUpdate: async (parent, args, context) => {
      try {
        const lessonVideoYoutube = await lessonVideoYoutubeEntity.setLessonVideoYoutube({
          lessonId: args.lessonId,
          isReady: args.isReady,
          name: args.name,
          youtubeVideoId: args.youtubeVideoId,
        })

        return lessonVideoYoutube.data;
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
  }
};

module.exports = lessonVideoYoutubeResolver;
