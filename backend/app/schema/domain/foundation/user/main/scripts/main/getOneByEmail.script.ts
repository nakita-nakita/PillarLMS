import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  email: string
}

export default function getOneByEmail(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const foundationUserSql = makeFoundationUserSql(d);
    const foundationUserValidation = makeFoundationUserValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Datapoint 'email' is required.",
        errorIdentifier: "foundationUser_getOneByEmail_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidEmail({
      str: args.email
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'email' is not Email format.",
        errorIdentifier: "foundationUser_getOneByEmail_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await foundationUserSql.getOneByEmail({
      email: args.email,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}