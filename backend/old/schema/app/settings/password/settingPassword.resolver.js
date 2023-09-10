const db = require("../../../../models")
const makeSettingPasswordLogic = require("./settingPassword.logic")

const settingPasswordLogic = makeSettingPasswordLogic(db)

const settingPasswordResolver = {
  Query: {
    settingPassword: async (parent, args) => {
      
      const settingPassword = await settingPasswordLogic.getOne();
    
      return settingPassword
    },
  },
  Mutation: {
    settingPasswordUpdate: async (parent, args) => {

      const settingPassword = await settingPasswordLogic.updateOne({
        passwordLength: args.passwordLength,
        shouldHaveUppercaseLetter: args.shouldHaveUppercaseLetter,
        shouldHaveLowercaseLetter: args.shouldHaveLowercaseLetter,
        shouldHaveNumber: args.shouldHaveNumber,
        shouldHaveSymbol: args.shouldHaveSymbol,
      })

      return settingPassword;
    },
  },
};
module.exports = settingPasswordResolver;
