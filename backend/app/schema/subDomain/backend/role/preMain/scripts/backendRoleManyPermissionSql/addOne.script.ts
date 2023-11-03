import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  roleId: string
  permissionId: string
}

export default function addOnePermission(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ roleId, permissionId, }: input): Promise<returningSuccessObj<Model<backendRoleManyPermission> | null>> => {

    const data = await db.backendRoleManyPermission.create({
      roleId,
      permissionId
    }, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


