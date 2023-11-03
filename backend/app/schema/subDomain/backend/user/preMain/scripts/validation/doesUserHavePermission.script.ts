import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionId: string
}

export default function doesUserHavePermission(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.backendUserManyPermission.count({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}


