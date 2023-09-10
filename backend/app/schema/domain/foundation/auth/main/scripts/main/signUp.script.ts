import makeFoundationUserEntity from "../../../../../../domain/foundation/user"
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func"
import stringHelpers from "../../../../../../utils/stringHelpers"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import makeBackendUserEntity from "../../../../user"
import makeBackendAuthCache from "../../../preMain/foundationAuth.cache"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"
import makeBackendAuthSql from "../../../preMain/foundationAuth.func"

type returningTokenObj = {
  token: string
}

type input = {
  email: string,
  password: string,
  confirmPassword: string,
  username?: string,
}

export default function signup(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {

    const { domainDb, errorHandler, transaction, loggers } = d

    const { userMain, userProfileMain } = makeFoundationUserEntity(d)
    const authFunc = makeFoundationAuthFunc(d)
    // const backendUserEntity = makeBackendUserEntity(d)
    const lookUpCookieCache = makeBackendAuthCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "backendAuth_signUp_error:0001"
      })
    }

    const isEmailValid = stringHelpers.isStringValidEmail({
      str: args.email
    })

    if (!isEmailValid) {
      return endMainFromError({
        hint: "Email is valid.",
        errorIdentifier: "backendAuth_signUp_error:0002"
      })
    }

    const isEmailTaken = await userMain.isEmailTaken({
      email: args.email,
    }).catch(errorHandler)

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is taken.",
        errorIdentifier: "backendAuth_signUp_error:0003"
      })
    }




    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "backendAuth_signUp_error:0004"
      })
    }

    if (!args.confirmPassword) {
      return endMainFromError({
        hint: "ConfirmPassword is missing.",
        errorIdentifier: "backendAuth_signUp_error:0005"
      })
    }

    if (args.password !== args.confirmPassword) {
      return endMainFromError({
        hint: "ConfirmPassword doesn't match.",
        errorIdentifier: "backendAuth_signUp_error:0006"
      })
    }

    const isPasswordValid = await userMain.isPasswordValid({
      password: args.password,
    })

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "backendAuth_signUp_error:0007"
      })
    }

    const user = await userMain.addOne({
      email: args.email,
      password: args.password,
    })

    if (args.username) {
      await userProfileMain.upsertOne({
        id: user.data.dataValues.id,
        username: args.username,
      })
    }

    const token = await authFunc.signinToken({ userId: user.data.dataValues.id })

    //reddis storage matching with cookie
    // const cookie = await lookUpCookieCache.lookupCookieTokenSet({
    //   token: token.data,
    // })

    return {
      success: true,
      data: {
        token: token.data,
      },
    }
  }
}