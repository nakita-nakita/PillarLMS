const db = require("../../../../models")
const makeSettingGeneralLogic = require('./settingGeneral.logic')

const settingGeneralLogic = makeSettingGeneralLogic(db);

const settingGeneralResolver = {
  Query: {
    settingGeneral: async (parent, args) => {
      
      const settingGeneral = await settingGeneralLogic.getOne()

      return settingGeneral
    },
  },
  Mutation: {
    settingGeneralUpdate: async (parent, args) => {
      
      const settingGeneral = await settingGeneralLogic.updateOne(args)
      
      return settingGeneral;
    },
  },
};
module.exports = settingGeneralResolver;
