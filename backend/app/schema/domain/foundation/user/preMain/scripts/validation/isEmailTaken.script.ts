import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { email: string }

export default function isEmailTaken({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where,
      transaction,
    })
    //.catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data !== 0
    }
  }
}


