import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  message: string
  type: string //NotificationTypeEnum
  url: string
  userId: string
  locationMessage?: string
  hasBeenSeen?: boolean
  hasBeenClicked?: boolean
}

// type: sequelize.ENUM("SYSTEM", "DISCUSSION"),

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input) => {

    const data = await db.backendNotification.create(
      args,
      {
        transaction: subDomainTransaction,
        returning: true,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


