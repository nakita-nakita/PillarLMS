const db = require("../../../models")
const makeAuthLogic = require("./auth.logic")
const makeAuthValidation = require("./auth.validation")
const makeUserLogic = require("../../foundation/user-old/user.logic");
const { errorHandler } = require("../../utils");
const makeSettingEmail = require("../../app/settings/email/settingEmail.logic");
const makeSettingRequestLogic = require("../../app/settings/request/settingRequest.logic");
const { sendEmail } = require("../../utils/sendEmail");

const authLogic = makeAuthLogic(db)
const authValidation = makeAuthValidation(db)
const userLogic = makeUserLogic(db)
const settingEmail = makeSettingEmail(db)
const settingRequestLogic = makeSettingRequestLogic(db)

const permissionResolver = {
  Query: {
    getuserIdFromToken: async (parent, args) => {
      const getuserIdFromToken = await authLogic.getuserIdFromToken({
        token: args.token
      })

      return getuserIdFromToken
    },
    canUserSignUp: async (parent, args) => {
      try {
        const settingRequest = await settingRequestLogic.getOne()

        switch (settingRequest.type) {
          case "ANYONE":

            return { result: true }

          case "REQUEST_NO_PASSWORD":

            return { result: false, message: "Use user request." }

          case "REQUEST":

            return { result: false, message: "Use user request with password." }

          case "MANUAL":

            return { result: false }
        }


      } catch (error) {
        console.log(error)
      }
    }

  },
  Mutation: {
    signup: async (parent, args) => {
      try {

        const isPasswordValid = await authValidation.isPasswordValid(args.password);
        if (!isPasswordValid.result) {
          return Error(isPasswordValid.data.join(' '))
        }

        const isEmailValid = await authValidation.isEmailValid(args.email);
        if (!isEmailValid.result) {
          return Error("Please use a proper formated email.");
        }

        const isUsernameUnique = await authValidation.isUsernameUnique(args.username)
        if (!isUsernameUnique.result) {
          return Error("Please select a different username.")
        }

        const doesAUserExists = await authValidation.doesAUserExists()
        const canUserSignUp = await authValidation.canUserSignUp()

        if (!canUserSignUp.result && doesAUserExists.result) {
          return Error(canUserSignUp.message)
        }

        const user = await userLogic.addOne({
          username: args.username,
          email: args.email,
          password: args.password,
          profile: args.profile,
          isCreator: !doesAUserExists.result ? true : args.isCreator,
          isAdmin: !doesAUserExists.result ? true : args.isAdmin,
          permissionMany: args.permissionMany,
          roleMany: args.roleMany
        });

        //first user is the root
        if (!doesAUserExists.result) {
          await authLogic.createFirstUser({ userId: user.id });
        }

        const token = await authLogic.signToken({ userId: user.id, isAdmin: user.isAdmin, isCreator: user.isCreator })

        return token
      } catch (err) {
        console.log(err)
        errorHandler(err)
      }
    },
    signin: async (parent, args, ctx) => {
      try {
        const user = await userLogic.findOne({
          where: {
            email: args.email,
          },
        })

        if (!user) {
          return Error("Authorization Failed");
        }

        var isPasswordCorrect = await authValidation.isPasswordCorrect({
          password1: args.password,
          password2: user.password
        });

        if (!isPasswordCorrect.result) {
          return Error("Authorization Failed");
        }

        const token = await authLogic.signToken({ userId: user.id, isCreator: user.isCreator, isAdmin: user.isAdmin, username: user.username, picture: user.profile?.picture })

        return token
      } catch (error) {
        console.log(error)
      }

    },
    forgotPassword: async (parent, args) => {
      try {
        const user = await userLogic.getOneByEmail({ email: args.email })

        if (!user) {
          return {
            result: false,
            message: "User not found."
          }
        }

        const settingEmailObject = await settingEmail.getOne()

        const email = await sendEmail({
          to: user.email,
          from: process.env.SENDGRID_FROM,
          subject: settingEmailObject.resetPasswordEmailSubject,
          text: settingEmailObject.resetPasswordEmailMessage,

        })

        return { result: true, data: email }

      } catch (error) {
        console.log(error)
      }

    },

  },
};
module.exports = permissionResolver