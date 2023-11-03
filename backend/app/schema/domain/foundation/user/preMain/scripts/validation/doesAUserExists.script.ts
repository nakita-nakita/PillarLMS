import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

export default function doesAUserExists(d: dependencies) {

  const db = d.domainDb.models;

  return async (): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}


