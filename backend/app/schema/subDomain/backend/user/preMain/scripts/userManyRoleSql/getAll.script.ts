import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
}

export default function getAll({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole>[]>> => {

    const data = await db.backendUserManyRole.findAll({
      where: {
        userId: args.id,
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data,
    }
  }
}