import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionId: string
}

export default function deleteOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendUserManyPermission.destroy(
      {
        where,
        transaction: d.subDomainTransaction,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


