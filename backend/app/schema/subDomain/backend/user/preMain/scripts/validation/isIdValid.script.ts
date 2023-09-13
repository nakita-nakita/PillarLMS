import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
}

export default function isIdValid({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  const db = subDomainDb.models

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data = await db.backendUser.count({
      where,
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


