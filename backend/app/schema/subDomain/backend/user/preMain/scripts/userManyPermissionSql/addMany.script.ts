import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  permissionIdsArray: string[]
}

export default function addMany({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId, permissionIdsArray, }: input): Promise<returningSuccessObj<Model<backendRoleManyPermission>>> => {

    const data = await db.backendUserManyPermission.bulkCreate(permissionIdsArray.map(permissionId => ({
      userId,
      permissionId,
    })), {
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


