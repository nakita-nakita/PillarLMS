import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  id: string
  message?: string
  type?: string //NotificationTypeEnum
  url?: string
  userId?: string,
  locationMessage?: string
  hasBeenSeen?: boolean
  hasBeenClicked?: boolean
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ id, ...args }: input) => {

    const data = await db.backendNotification.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


