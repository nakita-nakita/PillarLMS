import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain, d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { Model } from "sequelize";
import makeFoundationUserProfileSql from "../../../../../../domain/foundation/user/preMain/foundationUserProfile.sql";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { CallByTypeEnum } from "../../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";

type input = {
  id: string
  // username?: string
  // birthday?: string
  // location?: string
  // website?: string
  // picture?: string

  firstName?: string
  lastName?: string
  username?: string
  picture?: string
  callByType?: CallByTypeEnum
  circleColor?: string
  labelColor?: string
}
export default function updateOne(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUserProfile>>> => {

    const userProfileSql = makeFoundationUserProfileSql(d)
    const userValidation = makeFoundationUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserAccount_deactivateOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserAccount_deactivateOne_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userProfileSql.upsertOne({
      // birthday: args.birthday,
      id: args.id,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
      picture: args.picture,
      callByType: args.callByType,
      circleColor: args.circleColor,
      labelColor: args.labelColor,
    })

    // .catch(error => errorHandler(error, loggers))

    return response
  }
}