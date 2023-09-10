const { errorHandler } = require('../../utils');
// const { setCourseSettingsPage, getReadAccessUsers, getUpdateAccessUsers, getSettingsAccessUsers } = require('./courseSettings.main');
// const { saveDocument } = require('../../../sockets/socket.samedoc');
const courseModuleMain = require('./courseModule.main')


const courseSettingsResolver = {
  Query: {
    courseModule: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseModuleGetMany({
          courseId: args.courseId
        })

        return response.data
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
  CourseModuleType: {
    lessons: async (parent, args, context) => {
      try {
        const lessonsResponse = await courseModuleMain.courseLessonGetMany({
          courseModuleId: parent.id,
        })

        return lessonsResponse.data
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
    courseModuleAddToEnd: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseModuleAddToEnd({
          courseId: args.courseId,
          name: args.name,
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseModuleUpdateOne: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseModuleUpdateOne({
          id: args.id,
          name: args.name,
          orderNumber: args.orderNumber,
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseModuleDelete: async (parent, args, context) => {
      try {

        const response = await courseModuleMain.courseModuleDelete({
          id: args.id,
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseModuleSet: async (parent, args, context) => {
      try {
        await courseModuleMain.courseModuleSet({
          courseId: args.courseId,
          modules: args.modules
        })

        const response = await courseModuleMain.courseModuleGetMany({
          courseId: args.courseId
        })

        return response.data

        return response
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },








    courseLessonAddToEnd: async (parent, args, context) => {
      try {

        const response = await courseModuleMain.courseLessonAddToEnd({
          courseModuleId: args.courseModuleId,
          courseId: args.courseId,
          name: args.name,
          type: args.type,
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseLessonUpdateOne: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseLessonUpdateOne({
          id: args.id,
          name: args.name,
          orderNumber: args.orderNumber,
          isReady: args.isReady,
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseLessonDelete: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseLessonDelete({
          id: args.id
        })

        return response.data
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseLessonSet: async (parent, args, context) => {
      try {
        const response = await courseModuleMain.courseLessonSet({
          courseModuleId: args.courseModuleId,
          lessons: args.lessons
        })

        return response
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

module.exports = courseSettingsResolver;