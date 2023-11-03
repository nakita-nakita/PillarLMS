import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  permissionIdsArray: string[]
}

export default function addMany(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ userId, permissionIdsArray, }: input): Promise<returningSuccessObj<Model<backendRoleManyPermission>>> => {

    const data = await db.backendUserManyPermission.bulkCreate(permissionIdsArray.map(permissionId => ({
      userId,
      permissionId,
    })), {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


