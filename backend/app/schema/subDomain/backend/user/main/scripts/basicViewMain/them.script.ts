import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain, d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeFoundationUserProfileSql from "../../../../../../domain/foundation/user/preMain/foundationUserProfile.sql";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";

type input = {
  id: string
}

type returnBasicViewType = {
  id: string
  picture: string
  username: string
  email: string
}

export default function them(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<returnBasicViewType>> => {

    const foundationUserProfileSql = makeFoundationUserProfileSql(d)
    const foundationUserSql = makeFoundationUserSql(d)
    const foundationUserValidation = makeFoundationUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUser_addOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUser_addOne_error0002"
      })
    }

    const isUserIdValid = await foundationUserValidation.isIdValid({
      id: args.id
    })

    if (!isUserIdValid.result) {
      return endMainFromError({
        hint: "'id' is not valid.",
        errorIdentifier: "backendUser_addOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const userResponse = await foundationUserSql.getOneById({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    const userProfileResponse = await foundationUserProfileSql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: {
        email: userResponse.data.dataValues.email,
        picture: userProfileResponse.data?.dataValues?.picture,
        id: userResponse.data.dataValues.id,
        username: userProfileResponse.data?.dataValues?.username,
      }
    }
  }
}