import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
}

export default function getUnseenNotificationCount({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId }: input): Promise<returningSuccessObj<number>> => {

    const notificationCount = await db.backendNotification.count({
      where: {
        userId,
        hasBeenSeen: false,
        deletedAt: null,
      },
      transaction: subDomainTransaction,
    })
    
    // .catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: notificationCount,
    }
  }
}