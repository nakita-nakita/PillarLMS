import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function hasBeenSeenById(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<Model<backendNotification>>> => {

    const data = await db.backendNotification.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          id,
        },
        returning: true,
        transaction: d.subDomainTransaction,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}