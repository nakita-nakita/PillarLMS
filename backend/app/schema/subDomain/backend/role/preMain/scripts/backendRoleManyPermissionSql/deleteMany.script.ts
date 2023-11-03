import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { roleId: string, permissionId: string, }

export default function deleteOnePermission(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input[]): Promise<returningSuccessObj<null>> => {

    for (let i = 0; i < args.length; i++) {
      const { roleId, permissionId } = args[i];

      await db.backendRoleManyPermission.destroy(
        {
          where: { roleId, permissionId, },
          transaction: d.subDomainTransaction,
        }
      ).catch(error => d.errorHandler(error, d.loggers))
    }

    return {
      success: true,
    }
  }
}


