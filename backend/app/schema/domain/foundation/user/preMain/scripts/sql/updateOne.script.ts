import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string,
  email?: string
  password?: string
  isDeactivated?: boolean
}

export default function updateOne({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const data = await db.foundationUser.update(
      args,
      {
        where: {
          id,
        },
        returning: true,
        transaction: domainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


