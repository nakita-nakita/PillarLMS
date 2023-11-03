import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


type input = {
  id: string
}

export default function hasBeenClick(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendNotification> | null>> => {

    const backendNotificationSql = makeBackendNotificationSql(d);
    const backendNotificationValidation = makeBackendNotificationValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================


    const isIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendNotification_hasBeenClick_error:0001"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await backendNotificationSql.hasBeenClick({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
