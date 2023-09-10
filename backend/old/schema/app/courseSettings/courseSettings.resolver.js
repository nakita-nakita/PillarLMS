const { errorHandler } = require('../../utils');
const { setCourseSettingsPage, getReadAccessUsers, getUpdateAccessUsers, getSettingsAccessUsers } = require('./courseSettings.main');
const { saveDocument } = require('../../../sockets/socket.samedoc');


const courseSettingsResolver = {
  Query: {
    courseSettingsReadAccessUsers: async (parent, args, context) => {
      try {
        const readAccessUsers = await getReadAccessUsers()
        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)
        const data = readAccessUsers.data.rows.map(user => ({
          userId: user.id,
          username: user.username
        }));

        return data;

      } catch (error) {
        errorHandler({ error })

        return {
          success: false,
          //testing
          message: error.message
        }
      }
    },
    courseSettingsUpdateAccessUsers: async (parent, args, context) => {
      try {
        const updateAccessUsers = await getUpdateAccessUsers()
        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

        return updateAccessUsers.data.rows.map(user => ({
          userId: user.id,
          username: user.username
        }))

        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

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
    courseSettingsSettingsAccessUsers: async (parent, args, context) => {
      try {
        const settingsAccessUsers = await getSettingsAccessUsers()
        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

        return settingsAccessUsers.data.rows.map(user => ({
          userId: user.id,
          username: user.username
        }))

        // const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

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

  },
  Mutation: {
    courseSettingsUpdate: async (parent, args, context) => {
      try {
        const setCourseSettingsPageReturn = await setCourseSettingsPage(args)

        saveDocument({ id: args.id, model: "course-settings", message: `${context.user.username || "User"} has saved the course's permissions.` })

        return {
          success: setCourseSettingsPageReturn.success,
        };
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