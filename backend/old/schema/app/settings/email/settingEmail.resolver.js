const db = require("../../../../models")
const makeSettingEmailLogic = require("./settingEmail.logic")

const settingEmailLogic = makeSettingEmailLogic(db)

const settingEmailResolver = {
  Query: {
    settingEmail: async (parent, args) => {

      const settingEmail = await settingEmailLogic.getOne()

      return settingEmail
    },
  },
  Mutation: {
    settingEmailUpdate: async (parent, args) => {

      const settingEmail = await settingEmailLogic.updateOne(args);

      return settingEmail;
    },
  },
};

module.exports = settingEmailResolver;
