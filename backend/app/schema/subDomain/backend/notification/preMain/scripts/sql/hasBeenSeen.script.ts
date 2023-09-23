import { Model } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";

type input = {
  userId: string
}

export default function hasBeenSeen({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ userId }: input): Promise<returningSuccessObj<Model<backendNotification>[]>> => {

    const data = await db.backendNotification.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          userId
        },
        returning: true,
        transaction: subDomainTransaction,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data[1] : null,
    }
  }
}


