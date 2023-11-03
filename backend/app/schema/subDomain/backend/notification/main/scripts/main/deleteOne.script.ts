import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";

type input = {
  id: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

    const backendNotificationSql = makeBackendNotificationSql(d);
    const backendNotificationValidation = makeBackendNotificationValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendNotification_deleteOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendNotification_deleteOne_error:0002"
      })
    }

    const isIdValid = await backendNotificationValidation.isIdValid({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendNotification_deleteOne_error:0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendNotificationSql.deleteOne({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}