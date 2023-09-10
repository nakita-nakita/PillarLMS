import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  roleId: string
  permissionId: string
}

export default function addOnePermission({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ roleId, permissionId, }: input): Promise<returningSuccessObj<Model<backendRoleManyPermission> | null>> => {

    const data = await db.backendRoleManyPermission.create({
      roleId,
      permissionId
    }, {
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


