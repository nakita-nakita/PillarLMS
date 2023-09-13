import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string,
  isAdmin?: boolean,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const data = await db.backendUser.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: subDomainTransaction,
      })
      // .catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


