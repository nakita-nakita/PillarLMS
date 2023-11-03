import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { permissionId: string, roleId: string, }

export default function doesRoleHavePermission(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ permissionId, roleId, }: input) => {

    const data = await db.backendRoleManyPermission.count({
      where: {
        permissionId,
        roleId
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0
    }
  }
}


