import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function isIdValid(d: dependencies) {

  const db = d.domainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data = await db.foundationUser.findOne({
      where,
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== null,
    }
  }
}


