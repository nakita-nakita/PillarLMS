import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function isIdValid({ domainDb, errorHandler, domainTransaction, loggers }: d_domain) {

  const db = domainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data = await db.foundationUser.findOne({
      where,
      transaction: domainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data !== null,
    }
  }
}


