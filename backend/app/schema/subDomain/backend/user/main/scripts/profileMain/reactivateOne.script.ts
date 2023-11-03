import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function reactivateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

    const userSql = makeFoundationUserSql(d)
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

    const isUserIdValid = await userValidation.isIdValid({
      id: args.id
    })

    if (!isUserIdValid.result) {
      return endMainFromError({
        hint: "'id' is not valid.",
        errorIdentifier: "backendUserAccount_deactivateOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    await userSql.updateOne({
      id: args.id,
      isDeactivated: false,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: true,
    };
  }
}