import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";
import { notificationAction } from "../../../preMain/scripts/sql/addOne.script";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import stringHelpers from "../../../../../../utils/stringHelpers";


type input = {
  id: string,
  message?: string
  hasBeenSeen?: boolean
  hasBeenClicked?: boolean
  action?: notificationAction
  userId?: string
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendNotification> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const backendNotificationSql = makeBackendNotificationSql(d);
    const backendNotificationValidation = makeBackendNotificationValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.message) {
      return endMainFromError({
        hint: "Datapoint 'message' is missing.",
        errorIdentifier: "backendNotification_addOne_error:0001"
      })
    }
    if (args.message.length <= 0) {
      return endMainFromError({
        hint: "Datapoint 'message' has an empty string.",
        errorIdentifier: "backendNotification_addOne_error:0002"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (args.userId && !isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendNotification_addOne_error:0003"
      })
    }

    const isIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendNotification_addOne_error:0004"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await backendNotificationSql.updateOne({
      id: args.id,
      message: args.message,
      hasBeenSeen: args.hasBeenSeen,
      hasBeenClicked: args.hasBeenClicked,
      action: args.action,
      userId: args.userId,
    })
    
    // .catch(error => errorHandler(error, loggers))

    return response
  }
}
