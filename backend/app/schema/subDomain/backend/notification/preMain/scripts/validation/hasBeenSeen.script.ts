import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  userId: string
}

export default function hasBeenSeen({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId }: input) => {

    const data = await db.backendNotification.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          userId
        },
        returning: true,
        transaction: subDomainTransaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data ? true : false,
    }
  }
}


