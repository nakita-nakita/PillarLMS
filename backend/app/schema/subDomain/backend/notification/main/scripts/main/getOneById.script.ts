import { Model } from "sequelize";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendNotification> | null>> => {

    const backendNotificationSql = makeBackendNotificationSql(d);
    const backendNotificationValidation = makeBackendNotificationValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendNotification_getOneById_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendNotification_getOneById_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendNotificationSql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}