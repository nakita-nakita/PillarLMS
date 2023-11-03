import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationUserSql from "../../../preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function reactivateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

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
    }).catch(error => d.errorHandler(error, d.loggers))

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
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}