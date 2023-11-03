import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string,
  isAdmin?: boolean,
}

export default function updateOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const data = await db.backendUser.update(
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


