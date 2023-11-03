import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
}

export default function getUnseenNotificationCount(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ userId }: input): Promise<returningSuccessObj<number>> => {

    const notificationCount = await db.backendNotification.count({
      where: {
        userId,
        hasBeenSeen: false,
        deletedAt: null,
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: notificationCount,
    }
  }
}