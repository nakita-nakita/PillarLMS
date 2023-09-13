import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  roleIdsArray: string[]
}

export default function addMany({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId, roleIdsArray, }: input): Promise<returningSuccessObj<Model<backendUserManyRole>>> => {

    const data = await db.backendUserManyRole.bulkCreate(roleIdsArray.map(roleId => ({
      userId,
      roleId,
    })), {
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


