import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string,
  email?: string
  password?: string
  isDeactivated?: boolean
}

export default function updateOne(d: dependencies) {

  const db = d.domainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const data = await db.foundationUser.update(
      args,
      {
        where: {
          id,
        },
        returning: true,
        transaction: d.domainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


