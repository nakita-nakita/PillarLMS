import { Model } from "sequelize";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string,
  count?: number
}

export default function getFirstByCount({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId, count }: input): Promise<returningSuccessObj<Model<backendNotification>[]>> => {

    const data = await db.backendNotification.findAll({
      where: {
        userId
      },
      limit: count || 3, 
      order: [['createdAt', 'DESC']],
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


