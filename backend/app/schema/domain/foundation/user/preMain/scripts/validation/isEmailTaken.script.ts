import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { email: string }

export default function isEmailTaken(d: dependencies) {

  const db = d.domainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where,
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0
    }
  }
}


