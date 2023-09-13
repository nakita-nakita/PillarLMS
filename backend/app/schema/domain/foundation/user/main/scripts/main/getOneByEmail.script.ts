import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";

type input = {
  email: string
}

export default function getOneByEmail({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const d = {
      domainDb,
      errorHandler,
      domainTransaction,
      loggers,
    }
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
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}