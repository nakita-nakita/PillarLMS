import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { Model } from "sequelize";
import makeFoundationUserProfileSql from "../../../../../../domain/foundation/user/preMain/foundationUserProfile.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUserProfile>>> => {

    const userProfileSql = makeFoundationUserProfileSql(d)

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

    const response = await userProfileSql.getOneById({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}