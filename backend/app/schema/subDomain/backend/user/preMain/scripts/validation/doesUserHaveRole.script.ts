import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  roleId: string
}

export default function doesUserHaveRole({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.backendUserManyRole.count({
      where,
      transaction
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}