import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { 
  id: string, 
}

export default function restoreTrashed(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<number>> => {

    const data = await db.backendMediaManagerFile.restore(
      {
        where: { id, },
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


