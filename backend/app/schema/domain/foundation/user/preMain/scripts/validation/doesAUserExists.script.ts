import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

export default function doesAUserExists({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      transaction: domainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}


