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
  id: string
}

export default function reactivateOne({ domainDb, errorHandler, transaction, loggers }: d_domain) {
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
        errorIdentifier: "foundationUser_reactivateOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "foundationUser_reactivateOne_error0002"
      })
    }

    const isIdValid = await foundationUserValidation.isIdValid({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "foundationUser_reactivateOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await foundationUserSql.deactivateOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}