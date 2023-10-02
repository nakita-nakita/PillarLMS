import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { 
  id: string, 
}

export default function restoreTrashed({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<number>> => {

    const data = await db.backendMediaManagerFolder.restore(
      {
        where: { id, },
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


