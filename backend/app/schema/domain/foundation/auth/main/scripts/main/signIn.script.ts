import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import makeFoundationUserEntity from "../../../../../../domain/foundation/user"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func"
import { isStringValidEmail } from "../../../../../../utils/stringHelpers/checkEmail"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"

type returningTokenObj = {
  token: string
}

type input = {
  email: string,
  password: string,
}

export default function signIn(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {
    // if production, early return
    if (process.env.NODE_ENV === "production") {
      return {
        success: false,
        result: false,
      }
    }

    const { email, password, } = args
    const { domainDb, errorHandler, domainTransaction, loggers } = d

    const { userMain, } = makeFoundationUserEntity(d)
    const authFunc = makeFoundationAuthFunc(d)
    // const lookUpCookieCache = makeBackendAuthCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "foundationAuth_signIn_error:0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "foundationAuth_signIn_error:0002"
      })
    }

    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "foundationAuth_signIn_error:0003"
      })
    }

    if (args.password.length === 0) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "foundationAuth_signIn_error:0004"
      })
    }

    const user = await userMain.getOneByEmail({
      email: args.email,
    })

    if (!user.data) {
      return endMainFromError({
        hint: "Authorization Failed",
        errorIdentifier: "foundationAuth_signIn_error:0000"
      })
    }

    // const isEmailTaken = await userMain.isEmailTaken({
    //   email,
    // })

    // if (!isEmailTaken.result) {
    //   return {
    //     success: false,
    //     humanMessage: "Authorization Failed"
    //   }
    // }


    const isPasswordCorrect = await userMain.isPasswordCorrect({
      encryptedPassword: user.data.dataValues.password,
      password,
    })

    if (!isPasswordCorrect.result) {
      return endMainFromError({
        hint: "Authorization Failed",
        errorIdentifier: "foundationAuth_signIn_error:0000"
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