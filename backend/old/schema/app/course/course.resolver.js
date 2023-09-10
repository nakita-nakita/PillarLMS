const db = require('../../../models');
const makeCourseLogic = require("./course.logic")
const makeCourseValidation = require("./course.validation")
const makeCourseSettingsLogic = require("../courseSettings/courseSettings.logic")
const { errorHandler } = require('../../utils');
const { saveDocument } = require('../../../sockets/socket.samedoc');

const courseLogic = makeCourseLogic(db)
const courseValidation = makeCourseValidation(db)
const courseSettingsLogic = makeCourseSettingsLogic(db)


const courseResolver = {
  Query: {
    course: async (parent, args) => {

      const course = await courseLogic.getOneById({
        id: args.id
      })

      return course
    },
    courseMany: async (parent, args) => {

      const courses = await courseLogic.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      return courses
    },
  },
  Mutation: {
    courseAdd: async (parent, args, context) => {
      try {

        const isNameUnique = await courseValidation.isNameUnique(args.name)
        if (!isNameUnique.result) {
          return Error("Please select a different name for your course.")
        }

        const course = await courseLogic.addOne(args);

        courseSettingsLogic.addOne({ courseId: course.id, ownerId: context.user?.id });

        return course;
      } catch (error) {
        errorHandler({ error })
      }
    },
    courseUpdate: async (parent, args, context) => {
      try {

        const isNameUnique = await courseValidation.isNameUnique(args.name)
        if (!isNameUnique.result) {
          return Error("Please select a different name for your course.")
        }

        const course = await courseLogic.updateOne(args);

        saveDocument({ id: args.id, model: "course-details", message: `${context.user.username || "User"} has saved the course's detail.` })

        return course;
      } catch (error) {
        errorHandler({ error })
      }
    },
    courseDelete: async (parent, args, context) => {
      try {
        const course = await courseLogic.deleteOne({id: args.id});

        return course;
      } catch (error) {
        errorHandler({ error })
      }
    },

  }
};

module.exports = courseResolver;