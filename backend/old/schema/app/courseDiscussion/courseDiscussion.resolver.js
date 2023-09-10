const { errorHandler } = require('../../utils');
// const { saveDocument } = require('../../../sockets/socket.samedoc');
const courseDiscussionMain = require('./courseDiscussion.main');
const userEntity = require('../../user/user/index');


const courseSettingsResolver = {
  Query: {
    courseDiscussions: async (parent, args, context) => {
      try {

        const discussions = await courseDiscussionMain.getDiscussions({
          courseId: args.courseId,
          type: args.type,
          pageSize: args.pageSize,
          page: args.page
        })

        return discussions.data;

      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseDiscussion: async (parent, args, context) => {
      try {

        const discussion = await courseDiscussionMain.getDiscussion({
          id: args.id,
        })

        return discussion.data;
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    // courseDiscussionGetTotalVote: async (parent, args, context) => {
    //   try {
    //     const totalVoteResponse = await courseDiscussionMain.getTotalVoteForDiscussion({
    //       courseDiscussionId: args.courseDiscussionId
    //     })

    //     return { totalVote: totalVoteResponse.totalVote }

    //   } catch (error) {
    //     errorHandler({ error })

    //     return {
    //       success: false,
    //       //testing
    //       message: error.message
    //     }
    //   }
    // },
    // courseDiscussionGetMyVote: async (parent, args, context) => {
    //   try {
    //     const totalVoteResponse = await courseDiscussionMain.getMyVoteForDiscussion({
    //       courseDiscussionId: args.courseDiscussionId,
    //       userId: context.user.id
    //     })

    //     return { totalVote: totalVoteResponse.totalVote }

    //   } catch (error) {
    //     errorHandler({ error })

    //     return {
    //       success: false,
    //       //testing
    //       message: error.message
    //     }
    //   }
    // },
    courseDiscussionComments: async (parent, args, context) => {
      try {

        const discussions = await courseDiscussionMain.getDiscussionComments({
          courseDiscussionId: args.courseDiscussionId,
          pageSize: args.pageSize,
          page: args.page
        })

        return discussions.data;
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
  CourseDiscussionType: {
    myVote: async (parent, args, context) => {
      const myVoteForDiscussion = await courseDiscussionMain.getMyVoteForDiscussion({
        courseDiscussionId: parent.id,
        userId: context.user.id
      })

      return myVoteForDiscussion.data
    },

    user: async (parent, args) => {
      const user = await userEntity.getOneById({
        id: parent.userId
      })

      return user
    },
  },
  CourseDiscussionCommentType: {
    user: async (parent, args) => {
      const user = await userEntity.getOneById({
        id: parent.userId
      })

      return user
    },
  },
  Mutation: {
    courseDiscussionAdd: async (parent, args, context) => {
      try {
        const response = await courseDiscussionMain.addDiscussion({
          userId: context.user.id,
          courseId: args.courseId,
          title: args.title,
          post: args.post,
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
    courseDiscussionUpdate: async (parent, args, context) => {
      try {

        const response = await courseDiscussionMain.updateDiscussion({
          id: args.id,
          title: args.title,
          post: args.post,
        })

        return response.data
        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

        // saveDocument({ id: args.id, model: "course-settings", message: `${context.user.username || "User"} has saved the course's permissions.` })

        // return {
        //   success: setCourseSettingsPageReturn.success,
        // };
      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseDiscussionDelete: async (parent, args, context) => {
      try {
        const response = await courseDiscussionMain.deleteDiscussion({
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
    courseDiscussionSetMyVote: async (parent, args, context) => {
      try {

        const response = await courseDiscussionMain.setMyVoteForDiscussion({
          courseDiscussionId: args.courseDiscussionId,
          userId: context.user.id,
          vote: args.vote,
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
    courseDiscussionCommentAdd: async (parent, args, context) => {
      try {
        const response = await courseDiscussionMain.addDiscussionComment({
          courseDiscussionId: args.courseDiscussionId,
          userId: context.user.id,
          post: args.post,
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
    courseDiscussionCommentUpdate: async (parent, args, context) => {
      try {
        const response = await courseDiscussionMain.updateDiscussionComment({
          id: args.id,
          post: args.post,
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
    courseDiscussionCommentDelete: async (parent, args, context) => {
      try {
        const response = await courseDiscussionMain.deleteDiscussionComment({
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
  }
};

module.exports = courseSettingsResolver;