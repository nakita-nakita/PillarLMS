import { Model } from "sequelize";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string,
  count?: number
}

export default function getFirstByCount(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ userId, count }: input): Promise<returningSuccessObj<Model<backendNotification>[]>> => {

    const data = await db.backendNotification.findAll({
      where: {
        userId
      },
      limit: count || 3, 
      order: [['createdAt', 'DESC']],
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


