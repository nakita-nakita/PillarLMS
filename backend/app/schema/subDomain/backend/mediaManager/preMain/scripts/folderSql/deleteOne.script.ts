import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ id, deletedBy }: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendMediaManagerFolder.destroy({
      where: {
        id,
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    // show who deleted the record.
    await db.backendMediaManagerFolder.update(
      { deletedBy, },
      {
        where: { id, },
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


