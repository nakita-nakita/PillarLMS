import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  id: string
}

export default function hasBeenClick({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ id }: input) => {

    const data = await db.backendNotification.update(
      {
        hasBeenClicked: true
      },
      {
        where: {
          id,
        },
        returning: true,
        transaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data[0] !== 0 ? true : false,
    }
  }
}