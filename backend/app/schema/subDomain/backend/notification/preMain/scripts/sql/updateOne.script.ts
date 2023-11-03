import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { notificationAction } from "./addOne.script";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
  message?: string
  hasBeenSeen?: boolean
  hasBeenClicked?: boolean
  action?: notificationAction,
  userId?: string,  
}

export default function updateOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendNotification>>> => {

    const data = await db.backendNotification.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


