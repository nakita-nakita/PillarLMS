const db = require("../../../../models")
const makeSettingRequestLogic = require('./settingRequest.logic')

const settingRequestLogic = makeSettingRequestLogic(db)

const settingRequestResolver = {
  Query: {
    settingRequest: async (parent, args) => {
      return await settingRequestLogic.getOne();
    },
  },
  Mutation: {
    settingRequestUpdate: async (parent, args) => {

      const settingRequest = await settingRequestLogic.updateOne({
        type: args.type,
        password: args.password,
      })

      return settingRequest;
    },
  },
};
module.exports = settingRequestResolver;
