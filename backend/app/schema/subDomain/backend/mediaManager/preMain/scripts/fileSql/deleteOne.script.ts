import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ id, deletedBy }: input): Promise<returningSuccessObj<number | null>> => {

    // show who deleted the record.
    await db.backendMediaManagerFile.update(
      { deletedBy, },
      {
        where: { id, },
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    const data = await db.backendMediaManagerFile.destroy({
      where: {
        id,
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


