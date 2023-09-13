import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = { permissionId: string, roleId: string, }

export default function doesRoleHavePermission({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ permissionId, roleId, }: input) => {

    const data = await db.backendRoleManyPermission.count({
      where: {
        permissionId,
        roleId
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data !== 0
    }
  }
}


