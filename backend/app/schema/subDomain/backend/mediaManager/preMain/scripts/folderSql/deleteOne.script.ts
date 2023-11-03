import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id, deletedBy }: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendMediaManagerFolder.destroy({
      where: {
        id,
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    // show who deleted the record.
    await db.backendMediaManagerFolder.update(
      { deletedBy, },
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


