import backendUserManyPermission from "../../../../../../../models/subDomain/backend/user/backendUserManyPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionId: string
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<backendUserManyPermission | null>> => {

    const data = await db.backendUserManyPermission.create(
      args,
      {
        transaction: subDomainTransaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


