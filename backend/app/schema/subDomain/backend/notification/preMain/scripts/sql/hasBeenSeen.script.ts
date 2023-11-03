import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
}

export default function hasBeenSeen(d: dependencies) {
  const db = d.subDomainDb.models;

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
        transaction: d.subDomainTransaction,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data[1] : null,
    }
  }
}


