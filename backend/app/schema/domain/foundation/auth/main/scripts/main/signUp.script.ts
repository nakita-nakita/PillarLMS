import makeFoundationUserEntity from "../../../../../../domain/foundation/user"
import makeBackendUserEntity from "../../../../../../subDomain/backend/user"
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func"
import stringHelpers from "../../../../../../utils/stringHelpers"
import { d_allDomain, d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"

type returningTokenObj = {
  token: string
}

type input = {
  email: string,
  password: string,
  confirmPassword: string,
  username?: string,
}

export default function signup(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<returningTokenObj>> => {

    const { domainDb, errorHandler, domainTransaction, loggers } = d

    const { userMain, userProfileMain, userProfileValidation } = makeFoundationUserEntity(d)
    const authFunc = makeFoundationAuthFunc(d)
    const backendUserEntity = makeBackendUserEntity(d)
    // const lookUpCookieCache = makeBackendAuthCache(d)

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
    //////////////////////////////////////
    // Sql
    // ===================================

    const doesAUserExists = await userProfileValidation.doesAUserExists();

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

    // if first user: add to backend
    if (!doesAUserExists.result) {
      await backendUserEntity.userMain.addOneById({
        userId: user.data.dataValues.id,
        isAdmin: true,
      })
    }

    // add all users to client.

    return {
      success: true,
      data: {
        token: token.data,
      },
    }
  }
}