import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { roleId: string, permissionId: string, }

export default function deleteOnePermission({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ roleId, permissionId, }: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendRoleManyPermission.destroy(
      {
        where: { roleId, permissionId, },
        transaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


