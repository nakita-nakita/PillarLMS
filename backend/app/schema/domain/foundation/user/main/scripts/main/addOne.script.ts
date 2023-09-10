import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";
import { isStringValidEmail } from "../../../../../../utils/stringHelpers/checkEmail";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";

type input = {
  email: string
  password: string
  isDeactivated?: boolean
}

export default function addOne({ domainDb, errorHandler, transaction, loggers }: d_domain) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const d = {
      domainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const foundationUserSql = makeFoundationUserSql(d);
    const foundationUserValidation = makeFoundationUserValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "foundationUser_addOne_error0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "foundationUser_addOne_error0002"
      })
    }

    const isEmailTaken = await foundationUserValidation.isEmailTaken({
      email: args.email,
    }).catch(error => errorHandler(error, loggers))

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is already taken.",
        errorIdentifier: "foundationUser_addOne_error0003"
      })
    }

    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "foundationUser_addOne_error0004"
      })
    }

    const isPasswordValid: returningSuccessObj<null> = await foundationUserValidation.isPasswordValid({
      password: args.password,
    }).catch(error => errorHandler(error, loggers))

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "foundationUser_addOne_error0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await foundationUserSql.addOne({
      email: args.email,
      password: args.password,
      isDeactivated: args.isDeactivated,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}