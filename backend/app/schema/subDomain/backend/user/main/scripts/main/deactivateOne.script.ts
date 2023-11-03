import { Model } from "sequelize";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function deactivateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUserProfile>>> => {

    const userSql = makeFoundationUserSql(d)

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

    const response = await userSql.deactivateOne({
      id: args.id
    })

    return response
  }
}