import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  userId: string
}

export default function doYouHaveNewBackendNotifications({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId }: input) => {

    const notification = await db.backendNotification.findOne({
      where: {
        userId,
        hasBeenSeen: false,
        isDeleted: false
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: notification ? true : false,
    }
  }
}