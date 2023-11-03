import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeFoundationUserProfileSql from "../../../../../../domain/foundation/user/preMain/foundationUserProfile.sql";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

type returnBasicViewType = {
  id: string
  email: String
  firstName: String
  lastName: String
  username: String
  picture: String
  callByType: String
  circleColor: String
  labelColor: String
}

export default function them(d: dependencies) {
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
        // user table
        id: userResponse.data.dataValues.id,
        email: userResponse.data.dataValues.email,
        //user profile table
        firstName: userProfileResponse.data?.dataValues?.firstName,
        lastName: userProfileResponse.data?.dataValues?.lastName,
        username: userProfileResponse.data?.dataValues?.username,
        picture: userProfileResponse.data?.dataValues?.picture,
        callByType: userProfileResponse.data?.dataValues?.callByType,
        circleColor: userProfileResponse.data?.dataValues?.circleColor,
        labelColor: userProfileResponse.data?.dataValues?.labelColor,
      }
    }
  }
}