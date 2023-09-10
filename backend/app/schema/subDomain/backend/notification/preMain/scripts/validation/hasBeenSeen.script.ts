import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  userId: string
}

export default function hasBeenSeen({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
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
        transaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data ? true : false,
    }
  }
}


