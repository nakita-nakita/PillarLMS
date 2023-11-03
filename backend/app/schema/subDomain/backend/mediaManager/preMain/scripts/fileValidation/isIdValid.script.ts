import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function isIdValid(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<null>> => {

    const data = await db.backendMediaManagerFile.count({
      where: {
        id,
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


