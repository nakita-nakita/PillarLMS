import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";
import { isStringValidEmail } from "../../../../../../utils/stringHelpers/checkEmail";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  id: string,
  email?: string
  password?: string
}

export default function updateOne({ domainDb, errorHandler, transaction, loggers }: d_domain) {
  let recordId;

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

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "foundationUser_updateOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "foundationUser_updateOne_error0002"
      })
    }

    const isIdValid = await foundationUserValidation.isIdValid({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "foundationUser_updateOne_error0003"
      })
    }

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "foundationUser_updateOne_error0004"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "foundationUser_updateOne_error0005"
      })
    }

    const isEmailTaken = await foundationUserValidation.isEmailTaken({
      email: args.email,
    }).catch(error => errorHandler(error, loggers))

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is already taken.",
        errorIdentifier: "foundationUser_updateOne_error0006"
      })
    }

    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "foundationUser_updateOne_error0007"
      })
    }

    const isPasswordValid: returningSuccessObj<null> = await foundationUserValidation.isPasswordValid({
      password: args.password,
    }).catch(error => errorHandler(error, loggers))

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "foundationUser_updateOne_error0008"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await foundationUserSql.updateOne({
      id: args.id,
      email: args.email,
      password: args.password,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: response.data,
    }
  }
}