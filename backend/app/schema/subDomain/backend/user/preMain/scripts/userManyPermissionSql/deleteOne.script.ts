import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionId: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendUserManyPermission.destroy(
      {
        where,
        transaction: subDomainTransaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


