import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  id: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ id }: input) => {

    const data = await db.backendNotification.destroy({
      where: {
        id,
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


